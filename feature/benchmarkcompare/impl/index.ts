import { Output, Line, Property, parse, padLeft, padRight } from '../../benchmarkviz/impl';

export { parse };
export type { Output, Line, Property };

export const exampleOld = `goos: linux
goarch: amd64
pkg: golang.org/x/perf/cmd/benchstat/testdata
BenchmarkEncode/format=json-48   690848   1726 ns/op   851 encoded_bytes/op   481 B/op   3 allocs/op
BenchmarkEncode/format=json-48   684861   1723 ns/op   847 encoded_bytes/op   475 B/op   3 allocs/op
BenchmarkEncode/format=json-48   693285   1707 ns/op   848 encoded_bytes/op   478 B/op   3 allocs/op
BenchmarkEncode/format=json-48   677692   1707 ns/op   849 encoded_bytes/op   477 B/op   3 allocs/op
BenchmarkEncode/format=json-48   692130   1713 ns/op   847 encoded_bytes/op   482 B/op   3 allocs/op
BenchmarkEncode/format=json-48   684164   1729 ns/op   848 encoded_bytes/op   482 B/op   3 allocs/op
BenchmarkEncode/format=json-48   682500   1736 ns/op   847 encoded_bytes/op   484 B/op   3 allocs/op
BenchmarkEncode/format=json-48   677509   1707 ns/op   848 encoded_bytes/op   476 B/op   3 allocs/op
BenchmarkEncode/format=json-48   687295   1705 ns/op   851 encoded_bytes/op   479 B/op   3 allocs/op
BenchmarkEncode/format=json-48   695533   1774 ns/op   849 encoded_bytes/op   475 B/op   3 allocs/op
BenchmarkEncode/format=gob-48   372699   3069 ns/op   1404 encoded_bytes/op   708 B/op   9 allocs/op
BenchmarkEncode/format=gob-48   394740   3075 ns/op   1401 encoded_bytes/op   705 B/op   9 allocs/op
BenchmarkEncode/format=gob-48   391335   3069 ns/op   1400 encoded_bytes/op   715 B/op   9 allocs/op
BenchmarkEncode/format=gob-48   383588   3067 ns/op   1402 encoded_bytes/op   703 B/op   9 allocs/op
BenchmarkEncode/format=gob-48   385885   3207 ns/op   1403 encoded_bytes/op   713 B/op   9 allocs/op
BenchmarkEncode/format=gob-48   389970   3064 ns/op   1402 encoded_bytes/op   709 B/op   9 allocs/op
BenchmarkEncode/format=gob-48   393361   3064 ns/op   1398 encoded_bytes/op   703 B/op   9 allocs/op
BenchmarkEncode/format=gob-48   393882   3058 ns/op   1396 encoded_bytes/op   712 B/op   9 allocs/op
BenchmarkEncode/format=gob-48   396171   3059 ns/op   1398 encoded_bytes/op   702 B/op   9 allocs/op
BenchmarkEncode/format=gob-48   397812   3062 ns/op   1398 encoded_bytes/op   711 B/op   9 allocs/op`;

export const exampleNew = `goos: linux
goarch: amd64
pkg: golang.org/x/perf/cmd/benchstat/testdata
BenchmarkEncode/format=json-48   714387   1423 ns/op   849 encoded_bytes/op   414 B/op   3 allocs/op
BenchmarkEncode/format=json-48   845445   1416 ns/op   848 encoded_bytes/op   416 B/op   3 allocs/op
BenchmarkEncode/format=json-48   815714   1411 ns/op   848 encoded_bytes/op   412 B/op   3 allocs/op
BenchmarkEncode/format=json-48   828824   1413 ns/op   853 encoded_bytes/op   413 B/op   3 allocs/op
BenchmarkEncode/format=json-48   834070   1412 ns/op   851 encoded_bytes/op   417 B/op   3 allocs/op
BenchmarkEncode/format=json-48   828123   1426 ns/op   851 encoded_bytes/op   416 B/op   3 allocs/op
BenchmarkEncode/format=json-48   834493   1422 ns/op   848 encoded_bytes/op   414 B/op   3 allocs/op
BenchmarkEncode/format=json-48   838406   1424 ns/op   852 encoded_bytes/op   417 B/op   3 allocs/op
BenchmarkEncode/format=json-48   836227   1447 ns/op   848 encoded_bytes/op   419 B/op   3 allocs/op
BenchmarkEncode/format=json-48   830835   1425 ns/op   849 encoded_bytes/op   412 B/op   3 allocs/op
BenchmarkEncode/format=gob-48   394441   3075 ns/op   1398 encoded_bytes/op   703 B/op   9 allocs/op
BenchmarkEncode/format=gob-48   393207   3065 ns/op   1404 encoded_bytes/op   703 B/op   9 allocs/op
BenchmarkEncode/format=gob-48   392374   3059 ns/op   1403 encoded_bytes/op   710 B/op   9 allocs/op
BenchmarkEncode/format=gob-48   396037   3065 ns/op   1398 encoded_bytes/op   719 B/op   9 allocs/op
BenchmarkEncode/format=gob-48   393255   3060 ns/op   1401 encoded_bytes/op   704 B/op   9 allocs/op
BenchmarkEncode/format=gob-48   382629   3081 ns/op   1399 encoded_bytes/op   706 B/op   9 allocs/op
BenchmarkEncode/format=gob-48   389558   3186 ns/op   1403 encoded_bytes/op   715 B/op   9 allocs/op
BenchmarkEncode/format=gob-48   392668   3135 ns/op   1400 encoded_bytes/op   722 B/op   9 allocs/op
BenchmarkEncode/format=gob-48   392313   3087 ns/op   1398 encoded_bytes/op   714 B/op   9 allocs/op
BenchmarkEncode/format=gob-48   394274   3062 ns/op   1398 encoded_bytes/op   710 B/op   9 allocs/op`;

// "N" is the raw b.N iteration count, not a comparable metric - benchstat itself never compares it.
const IGNORED_PROPERTIES = new Set(['N']);

// Two-sided significance threshold used by benchstat itself (p < 0.05 is considered significant).
const SIGNIFICANCE_ALPHA = 0.05;

export interface SampleSummary {
  center: number; // median of the samples
}

export interface ComparisonCell {
  old?: SampleSummary;
  new?: SampleSummary;
  deltaPercent?: number;
  pValue?: number;
  significant: boolean;
}

export interface ComparisonColumn {
  name: string; // original property name, e.g. "ns/op"
  displayName: string; // e.g. "sec/op"
}

export interface ComparisonRow {
  name: string;
  cells: (ComparisonCell | null)[]; // aligned with Comparison.columns
}

export interface Comparison {
  old: Output;
  new: Output;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
}

export function compare(oldOutput: Output, newOutput: Output): Comparison {
  const oldGroups = groupLinesByName(oldOutput.lines);
  const newGroups = groupLinesByName(newOutput.lines);

  const rowNames = collectNames(oldOutput.lines, newOutput.lines);
  const columnNames = collectColumnNames(oldOutput.properties, newOutput.properties);

  const rows: ComparisonRow[] = rowNames.map((name) => {
    const oldLines = oldGroups.get(name) ?? [];
    const newLines = newGroups.get(name) ?? [];

    const cells = columnNames.map((columnName) => {
      const oldValues = valuesFor(oldOutput, oldLines, columnName);
      const newValues = valuesFor(newOutput, newLines, columnName);

      // Only ever show a genuine old-vs-new comparison - never a one-sided value.
      if (oldValues.length === 0 || newValues.length === 0) {
        return null;
      }

      const oldSummary = summarize(oldValues);
      const newSummary = summarize(newValues);

      const cell: ComparisonCell = { old: oldSummary, new: newSummary, significant: false };
      if (oldSummary.center !== 0) {
        cell.deltaPercent = ((newSummary.center - oldSummary.center) / Math.abs(oldSummary.center)) * 100;
        cell.pValue = mannWhitneyPValue(oldValues, newValues);
        cell.significant = cell.pValue < SIGNIFICANCE_ALPHA;
      }

      return cell;
    });

    return { name, cells };
  });

  const columns: ComparisonColumn[] = columnNames.map((name) => ({
    name,
    displayName: name === 'ns/op' ? 'sec/op' : name
  }));

  return { old: oldOutput, new: newOutput, columns, rows };
}

function groupLinesByName(lines: Line[]): Map<string, Line[]> {
  const map = new Map<string, Line[]>();
  for (const line of lines) {
    const group = map.get(line.name);
    if (group) {
      group.push(line);
    } else {
      map.set(line.name, [line]);
    }
  }
  return map;
}

// Only benchmarks present on both sides can be compared - a benchmark added or removed
// between runs has nothing to show an old-vs-new delta for.
function collectNames(oldLines: Line[], newLines: Line[]): string[] {
  const newNames = new Set(newLines.map((line) => line.name));

  const names: string[] = [];
  const seen = new Set<string>();
  for (const line of oldLines) {
    if (newNames.has(line.name) && !seen.has(line.name)) {
      seen.add(line.name);
      names.push(line.name);
    }
  }
  return names;
}

// Only metrics reported on both sides can be compared - e.g. a custom metric only the new
// run reports has nothing to show an old-vs-new delta for.
function collectColumnNames(oldProperties: Property[], newProperties: Property[]): string[] {
  const newNames = new Set(newProperties.map((property) => property.name));

  const names: string[] = [];
  for (const property of oldProperties) {
    if (IGNORED_PROPERTIES.has(property.name) || !newNames.has(property.name)) {
      continue;
    }
    names.push(property.name);
  }
  return names;
}

function valuesFor(output: Output, lines: Line[], propertyName: string): number[] {
  const index = output.properties.findIndex((p) => p.name === propertyName);
  if (index < 0) {
    return [];
  }
  return lines.map((line) => line.values[index]).filter((value): value is number => value !== undefined);
}

export function median(sortedValues: number[]): number {
  const n = sortedValues.length;
  if (n === 0) {
    return NaN;
  }
  const mid = Math.floor(n / 2);
  return n % 2 === 0 ? (sortedValues[mid - 1]! + sortedValues[mid]!) / 2 : sortedValues[mid]!;
}

// The median is a robust center: unlike the mean, a single wild sample can't drag it around.
export function summarize(values: number[]): SampleSummary {
  return { center: median([...values].sort((a, b) => a - b)) };
}

// Standard normal CDF, via the Abramowitz & Stegun erf approximation (accurate to ~1e-7).
function normalCdf(z: number): number {
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return 0.5 * (1 + sign * y);
}

// Two-sided Mann-Whitney U-test (a.k.a. Wilcoxon rank-sum test), the same test benchstat itself
// uses to decide whether the difference between old and new sets of measurements is statistically significant.
export function mannWhitneyPValue(a: number[], b: number[]): number {
  const n1 = a.length;
  const n2 = b.length;
  if (n1 === 0 || n2 === 0) {
    return 1;
  }

  const tagged = [...a.map((value) => ({ value, group: 0 })), ...b.map((value) => ({ value, group: 1 }))];
  tagged.sort((x, y) => x.value - y.value);

  const ranks: number[] = new Array(tagged.length);
  let tieCorrection = 0;
  let i = 0;
  while (i < tagged.length) {
    let j = i;
    while (j + 1 < tagged.length && tagged[j + 1]!.value === tagged[i]!.value) {
      j++;
    }

    const rank = (i + j) / 2 + 1; // average rank of the tied group, 1-based
    for (let k = i; k <= j; k++) {
      ranks[k] = rank;
    }

    const tieCount = j - i + 1;
    if (tieCount > 1) {
      tieCorrection += tieCount ** 3 - tieCount;
    }

    i = j + 1;
  }

  let rankSumA = 0;
  for (let k = 0; k < tagged.length; k++) {
    if (tagged[k]!.group === 0) {
      rankSumA += ranks[k]!;
    }
  }

  const n = n1 + n2;
  const u1 = rankSumA - (n1 * (n1 + 1)) / 2;
  const meanU = (n1 * n2) / 2;
  const varianceU = n > 1 ? ((n1 * n2) / 12) * (n + 1 - tieCorrection / (n * (n - 1))) : 0;

  if (varianceU <= 0) {
    return u1 === meanU ? 1 : 0;
  }

  const stdDevU = Math.sqrt(varianceU);

  // Continuity correction: shift the statistic half a unit towards zero, but never past it.
  let diff = u1 - meanU;
  if (diff > 0.5) {
    diff -= 0.5;
  } else if (diff < -0.5) {
    diff += 0.5;
  } else {
    diff = 0;
  }

  const z = diff / stdDevU;
  const p = 2 * (1 - normalCdf(Math.abs(z)));

  return Math.min(1, Math.max(0, p));
}

function formatSignedPercent(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function formatDelta(cell: ComparisonCell | null | undefined): string {
  if (!cell || cell.deltaPercent === undefined || cell.pValue === undefined) {
    return 'n/a';
  }
  if (!cell.significant) {
    return '~';
  }
  return formatSignedPercent(cell.deltaPercent);
}

export interface RenderedTableRow {
  name: string;
  cells: string[]; // one formatted comparison result per column, aligned with Comparison.columns
}

export interface RenderedTable {
  headers: string[]; // ['Benchmark', ...column display names]
  rows: RenderedTableRow[];
}

// A single table holding only the old-vs-new comparison result for every metric - shared by the
// Table view and by the text/markdown exporters, so they always agree on formatting.
export function renderTable(comparison: Comparison): RenderedTable {
  const headers = ['Benchmark', ...comparison.columns.map((c) => c.displayName)];

  const rows: RenderedTableRow[] = comparison.rows.map((row) => ({
    name: row.name,
    cells: row.cells.map((cell) => formatDelta(cell))
  }));

  return { headers, rows };
}

export function asText(comparison: Comparison): string {
  const { headers, rows } = renderTable(comparison);
  const [nameHeader, ...valueHeaders] = headers;

  const nameWidth = Math.max(nameHeader!.length, ...rows.map((row) => row.name.length));
  const valueWidths = valueHeaders.map((header, i) => Math.max(header.length, ...rows.map((row) => row.cells[i]!.length)));

  let str = padRight(nameHeader!, nameWidth);
  for (let i = 0; i < valueHeaders.length; i++) {
    str += `   ${padLeft(valueHeaders[i]!, valueWidths[i]!)}`;
  }
  str += '\n';

  for (const row of rows) {
    str += padRight(row.name, nameWidth);
    for (let i = 0; i < row.cells.length; i++) {
      str += `   ${padLeft(row.cells[i]!, valueWidths[i]!)}`;
    }
    str += '\n';
  }

  return str.trimEnd();
}

export function asMarkdown(comparison: Comparison): string {
  const { headers, rows } = renderTable(comparison);
  const [nameHeader, ...valueHeaders] = headers;

  const wrapped = rows.map((row) => ({
    name: `\`${row.name}\``,
    cells: row.cells.map((cell) => `\`${cell}\``)
  }));

  const nameWidth = Math.max(nameHeader!.length, ...wrapped.map((row) => row.name.length));
  const valueWidths = valueHeaders.map((header, i) => Math.max(header.length, ...wrapped.map((row) => row.cells[i]!.length)));

  let str = `| ${padRight(nameHeader!, nameWidth)} |`;
  for (let i = 0; i < valueHeaders.length; i++) {
    str += ` ${padLeft(valueHeaders[i]!, valueWidths[i]!)} |`;
  }
  str += '\n';

  str += `|:${'-'.repeat(nameWidth)}|`;
  for (const width of valueWidths) {
    str += `${'-'.repeat(width + 1)}:|`;
  }
  str += '\n';

  for (const row of wrapped) {
    str += `| ${padRight(row.name, nameWidth)} |`;
    for (let i = 0; i < row.cells.length; i++) {
      str += ` ${padLeft(row.cells[i]!, valueWidths[i]!)} |`;
    }
    str += '\n';
  }

  return str.trimEnd();
}
