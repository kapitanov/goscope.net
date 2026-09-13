import { describe, expect, test } from '@jest/globals';
import { parse } from './parser';
import { jsonPayloadExample, logfmtExample, jsonLinesExample, jsonPayloadSample, logfmtSample, jsonLinesSample, demoExample } from './example';

describe('logviz/parser', () => {
  test('should not parse empty string', () => {
    expect(() => parse('')).toThrow();
  });

  test('should not parse whitespace-only string', () => {
    expect(() => parse('   \n\t\n  ')).toThrow();
  });

  test('should parse a "json-payload" formatted line', () => {
    const result = parse(jsonPayloadExample);

    expect(result.items).toHaveLength(1);
    expect(result.format).toBe('json-payload');

    const item = result.items[0]!;
    expect(item.format).toBe('json-payload');
    expect(item.timestamp).toBe('2026-03-17 14:28:47.365387');
    expect(item.level).toBe('ERROR');
    expect(item.logger).toBe('diagapi');
    expect(item.message).toBe('panic while handling http request');
    expect(item.fields).toContainEqual({ key: 'endpoint', value: 'GET /favicon.ico' });
    expect(item.fields).toContainEqual({ key: 'client_ip', value: '192.168.2.100' });
    expect(item.fields.find((f) => f.key === 'stack')?.value).toMatch(/^goroutine 352 \[running\]:/);
  });

  test('should parse a "logfmt" formatted line', () => {
    const result = parse(logfmtExample);

    expect(result.items).toHaveLength(1);
    expect(result.format).toBe('logfmt');

    const item = result.items[0]!;
    expect(item.format).toBe('logfmt');
    expect(item.timestamp).toBe('2026-03-17T14:28:47.365387Z');
    expect(item.level).toBe('ERROR');
    expect(item.logger).toBe('diagapi');
    expect(item.message).toBe('panic while handling http request');
    expect(item.fields).toContainEqual({ key: 'endpoint', value: 'GET /favicon.ico' });
    expect(item.fields).toContainEqual({ key: 'client_ip', value: '192.0.2.100' });
    expect(item.fields.find((f) => f.key === 'stack')?.value).toMatch(/^goroutine 352 \[running\]:/);
  });

  test('should parse a "json-lines" formatted line', () => {
    const result = parse(jsonLinesExample);

    expect(result.items).toHaveLength(1);
    expect(result.format).toBe('json-lines');

    const item = result.items[0]!;
    expect(item.format).toBe('json-lines');
    expect(item.timestamp).toBe('2026-03-17T14:28:47.365387Z');
    expect(item.level).toBe('ERROR');
    expect(item.logger).toBe('diagapi');
    expect(item.message).toBe('panic while handling http request');
    expect(item.fields).toContainEqual({ key: 'endpoint', value: 'GET /favicon.ico' });
    expect(item.fields).toContainEqual({ key: 'client_ip', value: '192.0.2.100' });
    expect(item.fields.find((f) => f.key === 'stack')?.value).toMatch(/^goroutine 352 \[running\]:/);
  });

  test('should parse the "json-payload" sample as four lines with varied levels', () => {
    const result = parse(jsonPayloadSample);

    expect(result.items).toHaveLength(4);
    expect(result.items.map((item) => item.format)).toStrictEqual(['json-payload', 'json-payload', 'json-payload', 'json-payload']);
    expect(result.items.map((item) => item.level)).toStrictEqual(['TRACE', 'WARN', 'CRITICAL', 'ERROR']);
  });

  test('should parse the "logfmt" sample as four lines with varied levels', () => {
    const result = parse(logfmtSample);

    expect(result.items).toHaveLength(4);
    expect(result.items.map((item) => item.format)).toStrictEqual(['logfmt', 'logfmt', 'logfmt', 'logfmt']);
    expect(result.items.map((item) => item.level)).toStrictEqual(['DEBUG', 'INFO', 'DEBUG', 'ERROR']);
  });

  test('should parse the "json-lines" sample as four lines with varied levels', () => {
    const result = parse(jsonLinesSample);

    expect(result.items).toHaveLength(4);
    expect(result.items.map((item) => item.format)).toStrictEqual(['json-lines', 'json-lines', 'json-lines', 'json-lines']);
    expect(result.items.map((item) => item.level)).toStrictEqual(['INFO', 'WARN', 'PANIC', 'ERROR']);
  });

  test('should auto-detect the format of each line in a mixed input', () => {
    const result = parse(demoExample);

    expect(result.items).toHaveLength(12);
    expect(result.items.map((item) => item.format)).toStrictEqual([
      'json-payload',
      'logfmt',
      'json-lines',
      'json-payload',
      'logfmt',
      'json-lines',
      'json-payload',
      'logfmt',
      'json-lines',
      'json-payload',
      'logfmt',
      'json-lines'
    ]);
  });

  test('should cover a range of levels and fields in the mixed demo input', () => {
    const result = parse(demoExample);

    const levelCounts = new Map<string, number>();
    for (const item of result.items) {
      levelCounts.set(item.level, (levelCounts.get(item.level) ?? 0) + 1);
    }
    expect(levelCounts.get('TRACE')).toBe(1);
    expect(levelCounts.get('DEBUG')).toBe(2);
    expect(levelCounts.get('INFO')).toBe(2);
    expect(levelCounts.get('WARN')).toBe(2);
    expect(levelCounts.get('CRITICAL')).toBe(1);
    expect(levelCounts.get('PANIC')).toBe(1);
    expect(levelCounts.get('ERROR')).toBe(3);

    const fieldKeys = new Set(result.items.flatMap((item) => item.fields.map((field) => field.key)));
    for (const key of [
      'route',
      'handler',
      'key',
      'ttl',
      'user_id',
      'ip',
      'client_ip',
      'requests_per_minute',
      'method',
      'path',
      'status',
      'duration_ms',
      'query',
      'mount',
      'used_percent',
      'component',
      'job_id',
      'reason'
    ]) {
      expect(fieldKeys.has(key)).toBe(true);
    }
  });

  test('should fall back to plain text for unstructured lines', () => {
    const result = parse('just a plain line of text');

    expect(result.items).toHaveLength(1);
    expect(result.format).toBe('text');

    const item = result.items[0]!;
    expect(item.format).toBe('text');
    expect(item.level).toBe('UNKNOWN');
    expect(item.message).toBe('just a plain line of text');
    expect(item.fields).toHaveLength(0);
  });

  test('should skip blank lines between entries', () => {
    const result = parse(`${logfmtExample}\n\n\n${logfmtExample}`);
    expect(result.items).toHaveLength(2);
  });

  test('should build built-in demo example', () => {
    const result = parse(demoExample);
    expect(result.total).toBe(12);
  });
});

describe('logviz/parser level normalization', () => {
  // Real-world level spellings, grouped by the canonical level they should normalize to.
  // Sources: syslog, Go's logrus/zerolog/zap, Java's java.util.logging, Python's logging,
  // PHP's Monolog, .NET's Serilog/NLog, Log4j and spdlog.
  const cases: [string, string][] = [
    ['TRACE', 'TRACE'],
    ['trace', 'TRACE'],
    ['TRC', 'TRACE'],
    ['VERBOSE', 'TRACE'],

    ['DEBUG', 'DEBUG'],
    ['debug', 'DEBUG'],
    ['DBG', 'DEBUG'],
    ['dbg', 'DEBUG'],
    ['FINE', 'DEBUG'],

    ['INFO', 'INFO'],
    ['info', 'INFO'],
    ['INF', 'INFO'],
    ['INFORMATION', 'INFO'],

    ['NOTICE', 'NOTICE'],
    ['notice', 'NOTICE'],

    ['WARN', 'WARN'],
    ['warn', 'WARN'],
    ['WARNING', 'WARN'],
    ['warning', 'WARN'],
    ['WRN', 'WARN'],

    ['ERROR', 'ERROR'],
    ['error', 'ERROR'],
    ['ERR', 'ERROR'],
    ['SEVERE', 'ERROR'],

    ['CRITICAL', 'CRITICAL'],
    ['critical', 'CRITICAL'],
    ['CRIT', 'CRITICAL'],

    ['ALERT', 'ALERT'],
    ['alert', 'ALERT'],

    ['EMERGENCY', 'EMERGENCY'],
    ['emergency', 'EMERGENCY'],
    ['EMERG', 'EMERGENCY'],

    ['FATAL', 'FATAL'],
    ['fatal', 'FATAL'],
    ['FTL', 'FATAL'],

    ['PANIC', 'PANIC'],
    ['panic', 'PANIC']
  ];

  test.each(cases)('should normalize logfmt level=%s to %s', (raw, expected) => {
    const result = parse(`level=${raw} msg="test"`);
    expect(result.items[0]!.level).toBe(expected);
  });

  test.each(cases)('should normalize json-lines level "%s" to %s', (raw, expected) => {
    const result = parse(`{"level":"${raw}","msg":"test"}`);
    expect(result.items[0]!.level).toBe(expected);
  });

  test.each(cases)('should normalize a bracketed [%s] level to %s', (raw, expected) => {
    const result = parse(`2026-01-01 00:00:00.000 [${raw}] svc: test`);
    expect(result.items[0]!.level).toBe(expected);
  });

  test('should keep an unrecognized level as-is, uppercased', () => {
    const result = parse('level=custom msg="test"');
    expect(result.items[0]!.level).toBe('CUSTOM');
  });
});

describe('logviz/parser field name matching', () => {
  // Structured fields (level, timestamp, logger, message) are matched case-insensitively,
  // since loggers disagree on key casing (e.g. lowercase "level" vs. PascalCase "Level").
  test('should recognize PascalCase field names in a json-lines entry', () => {
    const result = parse('{"Timestamp":"2026-01-01T00:00:00Z","Level":"ERROR","Logger":"svc","Msg":"something failed","Extra":"value"}');

    const item = result.items[0]!;
    expect(item.timestamp).toBe('2026-01-01T00:00:00Z');
    expect(item.level).toBe('ERROR');
    expect(item.logger).toBe('svc');
    expect(item.message).toBe('something failed');
    expect(item.fields).toStrictEqual([{ key: 'Extra', value: 'value' }]);
  });

  test('should recognize UPPERCASE field names in a json-lines entry', () => {
    const result = parse('{"TIMESTAMP":"2026-01-01T00:00:00Z","LEVEL":"warn","LOGGER":"svc","MESSAGE":"disk almost full"}');

    const item = result.items[0]!;
    expect(item.timestamp).toBe('2026-01-01T00:00:00Z');
    expect(item.level).toBe('WARN');
    expect(item.logger).toBe('svc');
    expect(item.message).toBe('disk almost full');
    expect(item.fields).toHaveLength(0);
  });

  test('should recognize a capitalized field name in a logfmt entry', () => {
    const result = parse('Level=ERROR Msg="something failed"');

    const item = result.items[0]!;
    expect(item.level).toBe('ERROR');
    expect(item.message).toBe('something failed');
  });
});
