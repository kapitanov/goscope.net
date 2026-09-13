import { describe, expect, test } from '@jest/globals';
import {
  exampleOld,
  exampleNew,
  parse,
  compare,
  summarize,
  mannWhitneyPValue,
  formatDelta,
  asText,
  asMarkdown,
  Comparison,
  ComparisonCell
} from './index';

function cell(comparison: Comparison, name: string, columnName: string): ComparisonCell {
  const column = comparison.columns.findIndex((c) => c.name === columnName);
  const row = comparison.rows.find((r) => r.name === name);
  const found = row?.cells[column];
  if (!found) {
    throw new Error(`No cell found for ${name}/${columnName}`);
  }
  return found;
}

describe('benchmarkcompare/parse', () => {
  test('should parse built-in examples', () => {
    const old = parse(exampleOld);
    const updated = parse(exampleNew);

    expect(old.goos).toStrictEqual('linux');
    expect(old.goarch).toStrictEqual('amd64');
    expect(old.lines).toHaveLength(20);
    expect(updated.lines).toHaveLength(20);
  });
});

describe('benchmarkcompare/summarize', () => {
  test('should compute the median for an odd-sized sample', () => {
    expect(summarize([3, 1, 2]).center).toStrictEqual(2);
  });

  test('should compute the median for an even-sized sample', () => {
    expect(summarize([1, 2, 3, 4]).center).toStrictEqual(2.5);
  });
});

describe('benchmarkcompare/mannWhitneyPValue', () => {
  test('should return 1 for identical samples', () => {
    expect(mannWhitneyPValue([1, 2, 3], [1, 2, 3])).toBeCloseTo(1, 6);
  });

  test('should return a small p-value for clearly separated samples', () => {
    const p = mannWhitneyPValue([1, 2, 3, 4, 5], [101, 102, 103, 104, 105]);
    expect(p).toBeLessThan(0.02);
  });

  test('should return 1 when either sample is empty', () => {
    expect(mannWhitneyPValue([], [1, 2, 3])).toStrictEqual(1);
  });
});

describe('benchmarkcompare/compare', () => {
  const comparison = compare(parse(exampleOld), parse(exampleNew));

  test('should list every benchmark as a row', () => {
    expect(comparison.rows.map((r) => r.name)).toStrictEqual(['BenchmarkEncode/format=json-48', 'BenchmarkEncode/format=gob-48']);
  });

  test('should compare duration, allocation, and the custom metric, but not the raw iteration count', () => {
    expect(comparison.columns.map((c) => c.name).sort()).toStrictEqual(['B/op', 'allocs/op', 'encoded_bytes/op', 'ns/op'].sort());
  });

  test('should detect a significant improvement for the json benchmark duration', () => {
    const jsonCell = cell(comparison, 'BenchmarkEncode/format=json-48', 'ns/op');

    expect(jsonCell.old?.center).toStrictEqual(1718);
    expect(jsonCell.new?.center).toStrictEqual(1422.5);
    expect(jsonCell.deltaPercent).toBeLessThan(0);
    expect(jsonCell.pValue).toBeLessThan(0.001);
    expect(jsonCell.significant).toBe(true);
  });

  test('should not report a significant duration change for the gob benchmark', () => {
    const gobCell = cell(comparison, 'BenchmarkEncode/format=gob-48', 'ns/op');

    expect(gobCell.pValue).toBeGreaterThan(0.05);
    expect(gobCell.significant).toBe(false);
  });

  test('should detect a significant improvement in allocated bytes for the json benchmark', () => {
    const jsonCell = cell(comparison, 'BenchmarkEncode/format=json-48', 'B/op');

    expect(jsonCell.deltaPercent).toBeLessThan(0);
    expect(jsonCell.significant).toBe(true);
  });

  test('should not report a significant allocation count change (it never varies run to run)', () => {
    const jsonCell = cell(comparison, 'BenchmarkEncode/format=json-48', 'allocs/op');
    const gobCell = cell(comparison, 'BenchmarkEncode/format=gob-48', 'allocs/op');

    expect(jsonCell.significant).toBe(false);
    expect(gobCell.significant).toBe(false);
  });

  test('should not report a significant change for a metric the change never touched', () => {
    const jsonCell = cell(comparison, 'BenchmarkEncode/format=json-48', 'encoded_bytes/op');
    const gobCell = cell(comparison, 'BenchmarkEncode/format=gob-48', 'encoded_bytes/op');

    expect(jsonCell.significant).toBe(false);
    expect(gobCell.significant).toBe(false);
  });

  test('should drop a metric only reported on one side', () => {
    const oldOutput = parse(`${exampleOld}\nBenchmarkOnlyOld-8   1000   1 ns/op   1 only_old_metric`);
    const newOutput = parse(`${exampleNew}\nBenchmarkOnlyNew-8   1000   1 ns/op   1 only_new_metric`);

    const asymmetric = compare(oldOutput, newOutput);

    expect(asymmetric.columns.map((c) => c.name)).not.toContain('only_old_metric');
    expect(asymmetric.columns.map((c) => c.name)).not.toContain('only_new_metric');
  });

  test('should drop a benchmark only present on one side', () => {
    const oldOutput = parse(`${exampleOld}\nBenchmarkOnlyOld-8   1000   1 ns/op`);
    const newOutput = parse(`${exampleNew}\nBenchmarkOnlyNew-8   1000   1 ns/op`);

    const asymmetric = compare(oldOutput, newOutput);

    expect(asymmetric.rows.map((r) => r.name)).not.toContain('BenchmarkOnlyOld-8');
    expect(asymmetric.rows.map((r) => r.name)).not.toContain('BenchmarkOnlyNew-8');
  });
});

describe('benchmarkcompare/formatting', () => {
  const comparison = compare(parse(exampleOld), parse(exampleNew));

  test('should format a significant delta with a sign and two decimals', () => {
    const jsonCell = cell(comparison, 'BenchmarkEncode/format=json-48', 'ns/op');
    expect(formatDelta(jsonCell)).toMatch(/^-\d+\.\d{2}%$/);
  });

  test('should format a non-significant delta as "~"', () => {
    const gobCell = cell(comparison, 'BenchmarkEncode/format=gob-48', 'ns/op');
    expect(formatDelta(gobCell)).toStrictEqual('~');
  });
});

describe('benchmarkcompare/export', () => {
  const comparison = compare(parse(exampleOld), parse(exampleNew));

  test('asText should render a single table with one column per metric, comparison result only', () => {
    const text = asText(comparison);
    const lines = text.split('\n');

    expect(lines[0]).toMatch(/Benchmark.*sec\/op.*encoded_bytes\/op.*B\/op.*allocs\/op/);
    expect(text).toContain('BenchmarkEncode/format=json-48');
    expect(text).toContain('-17.20%');
    expect(text).not.toContain('geomean');
    expect(text).not.toContain('p=');
    expect(text).not.toContain('n=10');
    expect(text).not.toContain('old sec/op');
    expect(text).not.toContain('### ');
  });

  test('asMarkdown should render a single GitHub-flavored table, comparison result only', () => {
    const markdown = asMarkdown(comparison);

    expect(markdown).toMatch(/\|\s*Benchmark\s*\|\s*sec\/op\s*\|\s*encoded_bytes\/op\s*\|\s*B\/op\s*\|\s*allocs\/op\s*\|/);
    expect(markdown).toContain('`BenchmarkEncode/format=json-48`');
    expect(markdown).not.toContain('geomean');
    expect(markdown).not.toContain('p=');
    expect(markdown).not.toContain('### ');
  });
});
