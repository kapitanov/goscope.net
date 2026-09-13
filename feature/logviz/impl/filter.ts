import Fuse from 'fuse.js';
import { LogEntries, LogEntry } from './model';

export interface FieldFilterArgs {
  key: string;
  values: string[];
}

export interface FilterArgs {
  text?: string;
  levels?: string[];
  field?: FieldFilterArgs | null;
}

export const filter = (entries: LogEntries, args: FilterArgs): LogEntries => {
  let items = entries.items;

  if (args.text) {
    items = filterByText(items, args.text);
  }

  if (args.levels && args.levels.length > 0) {
    items = filterByLevel(items, args.levels);
  }

  if (args.field && args.field.values.length > 0) {
    items = filterByField(items, args.field);
  }

  return {
    items,
    format: entries.format,
    text: entries.text,
    total: entries.total
  };
};

function filterByText(items: LogEntry[], query: string): LogEntry[] {
  const textDocuments = items.map((item) => ({
    item,
    text: [item.timestamp, item.level, item.logger, item.message, ...item.fields.map((field) => `${field.key} ${field.value}`)]
  }));

  const fuse = new Fuse(textDocuments, { keys: ['text'] });
  return fuse.search(query).map((result) => result.item.item);
}

function filterByLevel(items: LogEntry[], levels: string[]): LogEntry[] {
  return items.filter((item) => levels.includes(item.level));
}

function filterByField(items: LogEntry[], field: FieldFilterArgs): LogEntry[] {
  return items.filter((item) => {
    const value = item.fields.find((f) => f.key === field.key)?.value;
    return value !== undefined && field.values.includes(value);
  });
}
