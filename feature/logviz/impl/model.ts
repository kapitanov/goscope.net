export interface LogField {
  key: string;
  value: string;
}

export type LogFormat = 'json-payload' | 'logfmt' | 'json-lines' | 'text';

export interface LogEntry {
  index: number;
  timestamp: string;
  level: string;
  logger: string;
  message: string;
  fields: LogField[];
  format: LogFormat;
  raw: string;
}

export interface LogEntries {
  items: LogEntry[];
  format?: LogFormat;
  text?: string;
  total: number;
}
