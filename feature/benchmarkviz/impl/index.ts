export const example = `goos: darwin
goarch: arm64
pkg: goscope.net/pprof/go-examples/benchmark
cpu: Apple M2
BenchmarkSearch/LinearSearch                7406            151091 ns/op                 8.000 NumCPU      1000000 items/count         0 B/op          0 allocs/op
BenchmarkSearch/BinarySearch             9824552               121.1 ns/op               8.000 NumCPU      1000000 items/count         0 B/op          0 allocs/op
BenchmarkSearch/JumpSearch               1826902              694.01 ns/op               8.000 NumCPU      1000000 items/count         0 B/op          0 allocs/op
PASS
ok      goscope.net/pprof/go-examples/benchmark 4.869s`;

export interface Property {
  name: string;
  precision: number;
  maxFormattedValueWidth: number;
  maxFormattedTextWidth: number;
}

export interface Line {
  name: string;
  values: number[]; // Raw values, e.g. 123.567
  formattedValues: string[]; // Values with proper formatting, e.g. '123.6'
  formattedTexts: string[]; // Values with proper formatting and unit, e.g. '123.6 sec'
}

export interface Output {
  goos: string;
  goarch: string;
  pkg: string;
  cpu: string;
  properties: Property[];
  lines: Line[];
  maxNameWidth: number;
}

export function parse(input: string): Output {
  const output: Output = {
    goos: '',
    goarch: '',
    pkg: '',
    cpu: '',
    properties: [] as Property[],
    lines: [] as Line[],
    maxNameWidth: 0
  };

  const lines = input.split('\n');
  for (let i = 0; i < lines.length; i++) {
    parseLine(i, lines[i], output);
  }

  renderFormattedText(output);

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
      const value = m[1];
      output.goos = value;
      return;
    }
  }

  // goarch: $GOARCH
  {
    const m = line.match(/^goarch:\s(.+)$/);
    if (m) {
      const value = m[1];
      output.goarch = value;
      return;
    }
  }

  // pkg: $GOPKG
  {
    const m = line.match(/^pkg:\s(.+)$/);
    if (m) {
      const value = m[1];
      output.pkg = value;
      return;
    }
  }

  // cpu: $GOCPU
  {
    const m = line.match(/^cpu:\s(.+)$/);
    if (m) {
      const value = m[1];
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

  const name = parts[0];
  const n = parseInt(parts[1]);

  const line: Line = {
    name,
    values: [],
    formattedValues: [],
    formattedTexts: []
  };

  output.lines.push(line);
  parseProperty(output, line, `${n} N`); // N is a predefined property, it maps to "b.N" value in Golang.

  for (let i = 2; i < parts.length; i++) {
    if (!parseProperty(output, line, parts[i])) {
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

  const value = parseFloat(parts[0]);
  const name = parts[1];
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
    const property: Property = { name, precision: 0, maxFormattedValueWidth: 0, maxFormattedTextWidth: 0 };
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

function renderFormattedText(output: Output) {
  for (const line of output.lines) {
    output.maxNameWidth = Math.max(output.maxNameWidth, line.name.length);

    for (const i in line.values) {
      const formattedValue = (+line.values[i]).toFixed(output.properties[i].precision);
      line.formattedValues.push(formattedValue);
      output.properties[i].maxFormattedValueWidth = Math.max(output.properties[i].maxFormattedValueWidth, formattedValue.length);

      const formattedText = `${formattedValue} ${output.properties[i].name}`;
      line.formattedTexts.push(formattedText);
      output.properties[i].maxFormattedTextWidth = Math.max(output.properties[i].maxFormattedTextWidth, formattedText.length);
    }
  }
}

export function asText(output: Output): string {
  if (!output) {
    return '';
  }

  let str = `goos: ${output.goos}
goarch: ${output.goarch}
pkg: ${output.pkg}
cpu: ${output.cpu}

`;

  for (const line of output.lines) {
    str += `${padRight(line.name, output.maxNameWidth)}`;

    for (const i in output.properties) {
      str += `   ${padLeft(line.formattedTexts[i], output.properties[i].maxFormattedTextWidth)}`;
    }

    str += '\n';
  }

  return str;
}

export function asMarkdown(output: Output): string {
  if (!output) {
    return '';
  }

  // Measure table respecting the headers.
  const propertyWidths: number[] = [];
  for (const property of output.properties) {
    const width = Math.max(property.maxFormattedTextWidth, property.name.length);
    propertyWidths.push(width);
  }

  // Header row.
  let str = '';
  str += `| ${padRight('Benchmark', output.maxNameWidth + 2)} |`;

  for (const i in output.properties) {
    str += ` ${padLeft(output.properties[i].name, propertyWidths[i] + 2)} |`;
  }
  str += '\n';

  // Separator row.
  str += `|:${repeatFor('-', output.maxNameWidth + 3)}|`;

  for (const i in output.properties) {
    str += `${repeatFor('-', propertyWidths[i] + 3)}:|`;
  }
  str += '\n';

  // Table body.
  for (const line of output.lines) {
    const name = '`' + line.name + '`';
    str += `| ${padRight(name, output.maxNameWidth + 2)} |`;

    for (const i in output.properties) {
      const text = '`' + line.formattedTexts[i] + '`';
      str += ` ${padLeft(text, propertyWidths[i] + 2)} |`;
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

    if (!line.match(/^\s*$/)) {
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
