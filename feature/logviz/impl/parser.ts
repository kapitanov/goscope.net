import { LogEntries, LogEntry, LogField, LogFormat } from './model';

export const parse = (input: string): LogEntries => {
  if (input.match(/^\s*$/)) {
    throw new Error('Input is empty!');
  }

  const lines = input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    throw new Error('Input is empty!');
  }

  const items = lines.map((line, index) => parseLine(index, line));

  return { items, format: detectDominantFormat(items), total: items.length };
};

function parseLine(index: number, line: string): LogEntry {
  return parseJsonLine(index, line) || parseTextWithPayloadLine(index, line) || parseLogfmtLine(index, line) || parseTextLine(index, line);
}

// Format 1: "JSON Lines" - the whole line is a single JSON object,
// e.g. {"timestamp":"...","level":"ERROR","msg":"...", ...}
function parseJsonLine(index: number, line: string): LogEntry | null {
  if (!line.startsWith('{') || !line.endsWith('}')) {
    return null;
  }

  let payload: unknown;
  try {
    payload = JSON.parse(line);
  } catch {
    return null;
  }

  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    return null;
  }

  return buildEntry(index, line, payload as Record<string, unknown>, 'json-lines');
}

// Format 2: "JSON payload" - a text-prefixed line with a trailing JSON object holding extra fields,
// e.g. 2026-03-17 14:28:47.365387 [ERROR] diagapi: panic while handling http request {"error": "...", ...}
const TEXT_PREFIX = /^(\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?)\s+\[([A-Za-z]+)\]\s+([^:\s]+):\s*(.*)$/;

function parseTextWithPayloadLine(index: number, line: string): LogEntry | null {
  const match = line.match(TEXT_PREFIX);
  if (!match) {
    return null;
  }

  const [, timestamp, level, logger, rest] = match as unknown as [string, string, string, string, string];
  let message = rest.trim();
  const fields: LogField[] = [];

  const jsonStart = rest.indexOf('{');
  if (jsonStart >= 0) {
    const jsonPart = rest.substring(jsonStart).trim();
    try {
      const payload = JSON.parse(jsonPart);
      if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
        message = rest.substring(0, jsonStart).trim();
        for (const key of Object.keys(payload)) {
          fields.push({ key, value: stringifyValue(payload[key]) });
        }
      }
    } catch {
      // The trailing text is not a valid JSON payload - keep it as a part of the message.
    }
  }

  return {
    index,
    timestamp,
    level: normalizeLevel(level),
    logger,
    message,
    fields,
    format: 'json-payload',
    raw: line
  };
}

// Format 3: "Logfmt" - space-separated key=value pairs,
// e.g. timestamp=2026-03-17T14:28:47.365387Z level=ERROR logger=diagapi msg="..." ...
const LOGFMT_LINE = /^([A-Za-z0-9_.-]+=(?:"(?:[^"\\]|\\.)*"|[^\s]+)\s*)+$/;
const LOGFMT_TOKEN = /([A-Za-z0-9_.-]+)=("(?:[^"\\]|\\.)*"|[^\s]+)/g;

function parseLogfmtLine(index: number, line: string): LogEntry | null {
  if (!LOGFMT_LINE.test(line)) {
    return null;
  }

  const payload: Record<string, string> = {};
  LOGFMT_TOKEN.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = LOGFMT_TOKEN.exec(line))) {
    payload[match[1]!] = unquoteLogfmtValue(match[2]!);
  }

  return buildEntry(index, line, payload, 'logfmt');
}

function unquoteLogfmtValue(value: string): string {
  if (value.startsWith('"') && value.endsWith('"')) {
    try {
      return JSON.parse(value);
    } catch {
      return value.substring(1, value.length - 1);
    }
  }

  return value;
}

// Fallback: an unstructured line is displayed as-is.
function parseTextLine(index: number, line: string): LogEntry {
  return {
    index,
    timestamp: '',
    level: 'UNKNOWN',
    logger: '',
    message: line,
    fields: [],
    format: 'text',
    raw: line
  };
}

const TIMESTAMP_KEYS = ['timestamp', 'time', 'ts', '@timestamp'];
const LEVEL_KEYS = ['level', 'lvl', 'severity'];
const LOGGER_KEYS = ['logger', 'log', 'component', 'name'];
const MESSAGE_KEYS = ['msg', 'message'];

function buildEntry(index: number, raw: string, payload: Record<string, unknown>, format: LogFormat): LogEntry {
  const consumed = new Set<string>();
  const timestamp = pickField(payload, TIMESTAMP_KEYS, consumed) ?? '';
  const level = pickField(payload, LEVEL_KEYS, consumed) ?? 'UNKNOWN';
  const logger = pickField(payload, LOGGER_KEYS, consumed) ?? '';
  const message = pickField(payload, MESSAGE_KEYS, consumed) ?? '';

  const fields: LogField[] = [];
  for (const key of Object.keys(payload)) {
    if (consumed.has(key)) {
      continue;
    }

    fields.push({ key, value: stringifyValue(payload[key]) });
  }

  return {
    index,
    timestamp,
    level: normalizeLevel(level),
    logger,
    message,
    fields,
    format,
    raw
  };
}

// Level names vary widely across logging libraries and ecosystems (case, abbreviation, long form).
// This table normalizes the common spellings to one canonical name per level, so that filtering
// and coloring behave consistently regardless of which logger produced the input.
const LEVEL_ALIASES: Record<string, string> = {
  // TRACE - the most verbose level (zerolog, spdlog, NLog; Serilog calls it "Verbose")
  TRACE: 'TRACE',
  TRC: 'TRACE',
  VERBOSE: 'TRACE',

  // DEBUG (java.util.logging calls it "FINE")
  DEBUG: 'DEBUG',
  DBG: 'DEBUG',
  FINE: 'DEBUG',

  // INFO
  INFO: 'INFO',
  INF: 'INFO',
  INFORMATION: 'INFO',

  // NOTICE - syslog and PHP's Monolog, between INFO and WARN
  NOTICE: 'NOTICE',

  // WARN (logrus/zerolog/many others spell out "warning")
  WARN: 'WARN',
  WARNING: 'WARN',
  WRN: 'WARN',

  // ERROR (java.util.logging calls it "SEVERE")
  ERROR: 'ERROR',
  ERR: 'ERROR',
  SEVERE: 'ERROR',

  // CRITICAL - syslog "crit", PHP's Monolog, Python's logging.CRITICAL
  CRITICAL: 'CRITICAL',
  CRIT: 'CRITICAL',

  // ALERT - syslog and Monolog
  ALERT: 'ALERT',

  // EMERGENCY - syslog "emerg" and Monolog
  EMERGENCY: 'EMERGENCY',
  EMERG: 'EMERGENCY',

  // FATAL (logrus, zerolog, Log4j, NLog)
  FATAL: 'FATAL',
  FTL: 'FATAL',

  // PANIC - logrus and Go's own panic/recover convention
  PANIC: 'PANIC'
};

function normalizeLevel(raw: string): string {
  const key = raw.trim().toUpperCase();
  return LEVEL_ALIASES[key] ?? key;
}

// Field names are matched case-insensitively, since loggers disagree on casing
// (e.g. lowercase "level"/"msg" vs. PascalCase "Level"/"Msg").
function pickField(payload: Record<string, unknown>, keys: string[], consumed: Set<string>): string | undefined {
  const payloadKeys = Object.keys(payload);
  for (const key of keys) {
    const actualKey = payloadKeys.find((k) => !consumed.has(k) && k.toLowerCase() === key);
    if (actualKey !== undefined) {
      consumed.add(actualKey);
      return stringifyValue(payload[actualKey]);
    }
  }

  return undefined;
}

function stringifyValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  return JSON.stringify(value);
}

function detectDominantFormat(items: LogEntry[]): LogFormat | undefined {
  const counts = new Map<LogFormat, number>();
  for (const item of items) {
    counts.set(item.format, (counts.get(item.format) ?? 0) + 1);
  }

  let dominant: LogFormat | undefined;
  let max = 0;
  for (const [format, count] of counts) {
    if (count > max) {
      max = count;
      dominant = format;
    }
  }

  return dominant;
}
