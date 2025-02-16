import { describe, expect, test } from '@jest/globals';
import { example, parse, Output, Line, detectValuePrecision, asText, asMarkdown, wrapIntoComments } from './index';

describe('benchmark/parser', () => {
  test('should parse built-in example', () => {
    const result = parse(example);

    const expected: Output = {
      goos: 'darwin',
      goarch: 'arm64',
      pkg: 'goscope.net/pprof/go-examples/benchmark',
      cpu: 'Apple M2',
      properties: [
        { name: 'N', precision: 0, maxFormattedValueWidth: 7, maxFormattedTextWidth: 9 },
        { name: 'ns/op', precision: 2, maxFormattedValueWidth: 9, maxFormattedTextWidth: 15 },
        { name: 'NumCPU', precision: 0, maxFormattedValueWidth: 1, maxFormattedTextWidth: 8 },
        { name: 'items/count', precision: 0, maxFormattedValueWidth: 7, maxFormattedTextWidth: 19 },
        { name: 'B/op', precision: 0, maxFormattedValueWidth: 1, maxFormattedTextWidth: 6 },
        { name: 'allocs/op', precision: 0, maxFormattedValueWidth: 1, maxFormattedTextWidth: 11 }
      ],
      lines: [] as Line[],
      maxNameWidth: 28
    };

    expected.lines.push({
      name: 'BenchmarkSearch/LinearSearch',
      values: [7406, 151091, 8.0, 1000000, 0, 0],
      formattedValues: ['7406', '151091.00', '8', '1000000', '0', '0'],
      formattedTexts: ['7406 N', '151091.00 ns/op', '8 NumCPU', '1000000 items/count', '0 B/op', '0 allocs/op']
    });

    expected.lines.push({
      name: 'BenchmarkSearch/BinarySearch',
      values: [9824552, 121.1, 8.0, 1000000, 0, 0],
      formattedValues: ['9824552', '121.10', '8', '1000000', '0', '0'],
      formattedTexts: ['9824552 N', '121.10 ns/op', '8 NumCPU', '1000000 items/count', '0 B/op', '0 allocs/op']
    });
    expected.lines.push({
      name: 'BenchmarkSearch/JumpSearch',
      values: [1826902, 694.01, 8.0, 1000000, 0, 0],
      formattedValues: ['1826902', '694.01', '8', '1000000', '0', '0'],
      formattedTexts: ['1826902 N', '694.01 ns/op', '8 NumCPU', '1000000 items/count', '0 B/op', '0 allocs/op']
    });

    expect(result).toStrictEqual(expected);
  });

  test('should not parse empty string', () => {
    expect(() => parse('')).toThrow();
  });
});

describe('benchmark/detectValuePrecision', () => {
  test('should detect value precision "0"', () => {
    expect(detectValuePrecision(0)).toStrictEqual(0);
  });
  test('should detect value precision "0.0"', () => {
    expect(detectValuePrecision(0.0)).toStrictEqual(0);
  });
  test('should detect value precision "0.1"', () => {
    expect(detectValuePrecision(0.1)).toStrictEqual(1);
  });
  test('should detect value precision "0.01"', () => {
    expect(detectValuePrecision(0.01)).toStrictEqual(2);
  });
});

describe('benchmark/asText', () => {
  test('should format built-in example', () => {
    const result = asText(parse(example));

    const expected = `goos: darwin
goarch: arm64
pkg: goscope.net/pprof/go-examples/benchmark
cpu: Apple M2

BenchmarkSearch/LinearSearch      7406 N   151091.00 ns/op   8 NumCPU   1000000 items/count   0 B/op   0 allocs/op
BenchmarkSearch/BinarySearch   9824552 N      121.10 ns/op   8 NumCPU   1000000 items/count   0 B/op   0 allocs/op
BenchmarkSearch/JumpSearch     1826902 N      694.01 ns/op   8 NumCPU   1000000 items/count   0 B/op   0 allocs/op
`;

    expect(result).toStrictEqual(expected);
  });
});

describe('benchmark/asMarkdown', () => {
  test('should format built-in example', () => {
    const result = asMarkdown(parse(example));

    const expected =
      '| Benchmark                      |           N |             ns/op |     NumCPU |           items/count |     B/op |     allocs/op |\n' +
      '|:-------------------------------|------------:|------------------:|-----------:|----------------------:|---------:|--------------:|\n' +
      '| `BenchmarkSearch/LinearSearch` |    `7406 N` | `151091.00 ns/op` | `8 NumCPU` | `1000000 items/count` | `0 B/op` | `0 allocs/op` |\n' +
      '| `BenchmarkSearch/BinarySearch` | `9824552 N` |    `121.10 ns/op` | `8 NumCPU` | `1000000 items/count` | `0 B/op` | `0 allocs/op` |\n' +
      '| `BenchmarkSearch/JumpSearch`   | `1826902 N` |    `694.01 ns/op` | `8 NumCPU` | `1000000 items/count` | `0 B/op` | `0 allocs/op` |\n';

    expect(result).toStrictEqual(expected);
  });
});

describe('benchmark/wrapIntoComments', () => {
  test('should wrap each line in C-style comments', () => {
    const input = `goos: darwin
goarch: arm64
pkg: goscope.net/pprof/go-examples/benchmark
cpu: Apple M2

BenchmarkSearch/LinearSearch      7406 N   151091.00 ns/op   8 NumCPU   1000000 items/count   0 B/op   0 allocs/op
BenchmarkSearch/BinarySearch   9824552 N      121.10 ns/op   8 NumCPU   1000000 items/count   0 B/op   0 allocs/op
BenchmarkSearch/JumpSearch     1826902 N      694.01 ns/op   8 NumCPU   1000000 items/count   0 B/op   0 allocs/op
`;
    const result = wrapIntoComments(input);

    const expected =`// goos: darwin
// goarch: arm64
// pkg: goscope.net/pprof/go-examples/benchmark
// cpu: Apple M2
//
// BenchmarkSearch/LinearSearch      7406 N   151091.00 ns/op   8 NumCPU   1000000 items/count   0 B/op   0 allocs/op
// BenchmarkSearch/BinarySearch   9824552 N      121.10 ns/op   8 NumCPU   1000000 items/count   0 B/op   0 allocs/op
// BenchmarkSearch/JumpSearch     1826902 N      694.01 ns/op   8 NumCPU   1000000 items/count   0 B/op   0 allocs/op`;
    expect(result).toStrictEqual(expected);
  });
});