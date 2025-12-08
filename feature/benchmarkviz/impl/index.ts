export const example = `goos: darwin
goarch: arm64
pkg: goscope.net/pprof/go-examples/benchmark
cpu: Apple M2
BenchmarkSearch/LinearSearch                7306            215740 ns/op           8.000 NumCPU      1000000 items/count         0 B/op          0 allocs/op
BenchmarkSearch/BinarySearch             7995318               149.5 ns/op         8.000 NumCPU      1000000 items/count         0 B/op          0 allocs/op
BenchmarkSearch/JumpSearch               1542253               931.4 ns/op         8.000 NumCPU      1000000 items/count         0 B/op          0 allocs/op
PASS
ok      goscope.net/pprof/go-examples/benchmark 5.671s`;

export interface Property {
  name: string;
  precision: number;
}

export interface Line {
  name: string;
  values: number[]; // Raw values, e.g. 123.567
}

export interface Output {
  goos: string;
  goarch: string;
  pkg: string;
  cpu: string;
  properties: Property[];
  lines: Line[];
}

export function parse(input: string): Output {
  const output: Output = {
    goos: '',
    goarch: '',
    pkg: '',
    cpu: '',
    properties: [] as Property[],
    lines: [] as Line[]
  };

  const lines = input.split('\n');
  for (let i = 0; i < lines.length; i++) {
    parseLine(i, lines[i]!, output);
  }

  if (!output.goos && !output.goarch && !output.pkg && !output.cpu && output.properties.length === 0 && output.lines.length === 0) {
    throw new Error('Input is empty!');
  }

  return output;
}

function parseLine(index: number, line: string, output: Output) {
  // Empty line.
  if (line.match(/^\s*$/)) {
    return;
  }

  // goos: $GOOS
  {
    const m = line.match(/^goos:\s(.+)$/);
    if (m) {
      const value = m[1]!;
      output.goos = value;
      return;
    }
  }

  // goarch: $GOARCH
  {
    const m = line.match(/^goarch:\s(.+)$/);
    if (m) {
      const value = m[1]!;
      output.goarch = value;
      return;
    }
  }

  // pkg: $GOPKG
  {
    const m = line.match(/^pkg:\s(.+)$/);
    if (m) {
      const value = m[1]!;
      output.pkg = value;
      return;
    }
  }

  // cpu: $GOCPU
  {
    const m = line.match(/^cpu:\s(.+)$/);
    if (m) {
      const value = m[1]!;
      output.cpu = value;
      return;
    }
  }

  // Benchmark line.
  if (parseBenchmarkLine(line, output)) {
    return;
  }

  // "PASS" line.
  if (line.match(/^PASS$/)) {
    return;
  }

  // Summary line - "ok {package} {duration}".
  if (line.match(/^ok\s.+$/)) {
    return;
  }

  // A malformed line.
  throw new Error(`At line ${index + 1}: Malformed benchmark output line.`);
}

function parseBenchmarkLine(str: string, output: Output): boolean {
  if (!str.match(/^[^\s]+\s+[0-9].*/)) {
    return false;
  }

  const parts = str.split(/\s{2,}/);
  if (parts.length < 3) {
    return false;
  }

  const name = parts[0]!;
  const n = parseInt(parts[1]!);

  const line: Line = {
    name,
    values: []
  };

  output.lines.push(line);
  parseProperty(output, line, `${n} N`); // N is a predefined property, it maps to "b.N" value in Golang.

  for (let i = 2; i < parts.length; i++) {
    if (!parseProperty(output, line, parts[i]!)) {
      return false;
    }
  }

  return true;
}

function parseProperty(output: Output, line: Line, raw: string): boolean {
  const parts = raw.split(' ', 2);
  if (parts.length < 2) {
    return false;
  }

  const value = parseFloat(parts[0]!);
  const name = parts[1]!;
  const property = getOrCreateProperty(output, name);
  line.values.push(value);

  property.precision = Math.max(property.precision, detectValuePrecision(value));

  return true;
}

function getOrCreateProperty(output: Output, name: string): Property {
  // We don't have lots of rows and columns in benchmark outputs, so linear search should suffice.
  for (const property of output.properties) {
    if (property.name === name) {
      return property;
    }
  }

  {
    const property: Property = { name, precision: 0 };
    output.properties.push(property);
    return property;
  }
}

export function detectValuePrecision(value: number): number {
  let str = `${value}`;

  let i = str.indexOf('.');
  if (i < 0) {
    // Number is not a float.
    return 0;
  }

  // Trim non-meaningful zeros.
  while (str.length > 0 && str[str.length - 1] === '0') {
    str = str.substring(0, str.length - 1);
  }

  i = str.indexOf('.');
  const precision = str.length - i - 1;
  return precision;
}

export interface Table {
  headers: TableHeader[];
  rows: TableRow[];
  maxNameWidth: number;
}

export interface TableHeader {
  name: string;
  maxFormattedValueWidth: number;
  maxFormattedTextWidth: number;
}

export interface TableRow {
  name: string;
  formattedValues: string[]; // Values with proper formatting, e.g. '123.6'
  formattedTexts: string[]; // Values with proper formatting and unit, e.g. '123.6 sec'
}

export type TimeFormat = 'ns' | 'us' | 'ms' | 's';
export const defaultTimeFormat: TimeFormat = 'ns';

export interface TableOptions {
  timeFormat?: TimeFormat;
}

export function asTable(output: Output, options?: TableOptions): Table {
  const table: Table = {
    headers: [],
    rows: [],
    maxNameWidth: 0
  };

  for (const i in output.properties) {
    table.headers.push({
      name: formatHeaderName(output.properties[i]!.name, options),
      maxFormattedValueWidth: 0,
      maxFormattedTextWidth: 0
    });
  }

  for (const line of output.lines) {
    table.maxNameWidth = Math.max(table.maxNameWidth, line.name.length);

    const row: TableRow = {
      name: line.name,
      formattedValues: [],
      formattedTexts: []
    };
    table.rows.push(row);

    for (const i in line.values) {
      const formattedValue = formatRowValue(output.properties[i]!.name, +line.values[i]!, output.properties[i]!.precision, options);
      row.formattedValues.push(formattedValue);
      table.headers[i]!.maxFormattedValueWidth = Math.max(table.headers[i]!.maxFormattedValueWidth, formattedValue.length);

      const formattedText = `${formattedValue} ${table.headers[i]!.name}`;
      row.formattedTexts.push(formattedText);
      table.headers[i]!.maxFormattedTextWidth = Math.max(table.headers[i]!.maxFormattedTextWidth, formattedText.length);
    }
  }

  return table;
}

function formatHeaderName(originalName: string, options?: TableOptions): string {
  if (originalName === 'ns/op' && options?.timeFormat) {
    switch (options.timeFormat) {
      case 'us':
        return 'us/op';
      case 'ms':
        return 'ms/op';
      case 's':
        return 's/op';
    }
  }

  return originalName;
}

function formatRowValue(originalName: string, value: number, precision: number, options?: TableOptions): string {
  if (originalName === 'ns/op' && options?.timeFormat) {
    switch (options.timeFormat) {
      case 'us':
        value /= 1e3;
        break;
      case 'ms':
        value /= 1e6;
        break;
      case 's':
        value /= 1e9;
        break;
    }
  }

  return (+value).toFixed(precision);
}

export function asText(output: Output, options?: TableOptions): string {
  if (!output) {
    return '';
  }

  let str = '';
  if (!!output.goos) {
    str += `goos: ${output.goos}\n`;
  }
  if (!!output.goarch) {
    str += `goarch: ${output.goarch}\n`;
  }
  if (!!output.pkg) {
    str += `pkg: ${output.pkg}\n`;
  }
  if (!!output.cpu) {
    str += `cpu: ${output.cpu}\n`;
  }
  if (str) {
    str += '\n';
  }

  const table = asTable(output, options);

  for (const row of table.rows) {
    str += `${padRight(row.name, table.maxNameWidth)}`;

    for (const i in output.properties) {
      str += `   ${padLeft(row.formattedTexts[i]!, table.headers[i]!.maxFormattedTextWidth)}`;
    }

    str += '\n';
  }

  return str;
}

export function asMarkdown(output: Output, options?: TableOptions): string {
  if (!output) {
    return '';
  }

  const table = asTable(output, options);

  // Measure table respecting the headers.
  const propertyWidths: number[] = [];
  for (const header of table.headers) {
    const width = Math.max(header.maxFormattedValueWidth, header.name.length);
    propertyWidths.push(width);
  }

  // Header row.
  let str = '';
  str += `| ${padRight('Benchmark', table.maxNameWidth + 2)} |`;

  for (const i in table.headers) {
    str += ` ${padLeft(table.headers[i]!.name, propertyWidths[i]! + 2)} |`;
  }
  str += '\n';

  // Separator row.
  str += `|:${repeatFor('-', table.maxNameWidth + 3)}|`;

  for (const i in table.headers) {
    str += `${repeatFor('-', propertyWidths[i]! + 3)}:|`;
  }
  str += '\n';

  // Table body.
  for (const row of table.rows) {
    const name = '`' + row.name + '`';
    str += `| ${padRight(name, table.maxNameWidth + 2)} |`;

    for (const i in table.headers) {
      const text = '`' + row.formattedValues[i] + '`';
      str += ` ${padLeft(text, propertyWidths[i]! + 2)} |`;
    }
    str += '\n';
  }

  return str;
}

export function wrapIntoComments(str: string): string {
  let result = '';

  const lines = str.trim().split('\n');

  for (const i in lines) {
    const line = lines[i];
    if (+i > 0) {
      result += '\n';
    }

    if (!line!.match(/^\s*$/)) {
      result += `// ${line}`;
    } else {
      result += '//';
    }
  }
  return result;
}

function padLeft(s: string, n: number): string {
  for (; s.length < n; ) {
    s = ' ' + s;
  }
  return s;
}

function padRight(s: string, n: number): string {
  for (; s.length < n; ) {
    s = s + ' ';
  }
  return s;
}

function repeatFor(s: string, n: number): string {
  let r = '';
  for (; r.length < n; ) {
    r += s;
  }
  return r;
}
