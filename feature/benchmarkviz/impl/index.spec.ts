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
        { name: 'N', precision: 0 },
        { name: 'ns/op', precision: 1 },
        { name: 'NumCPU', precision: 0 },
        { name: 'items/count', precision: 0 },
        { name: 'B/op', precision: 0 },
        { name: 'allocs/op', precision: 0 }
      ],
      lines: [] as Line[],
    };

    expected.lines.push({
      name: 'BenchmarkSearch/LinearSearch',
      values: [7306, 215740, 8.0, 1000000, 0, 0],
    });

    expected.lines.push({
      name: 'BenchmarkSearch/BinarySearch',
      values: [7995318, 149.5, 8.0, 1000000, 0, 0],
    });
    expected.lines.push({
      name: 'BenchmarkSearch/JumpSearch',
      values: [1542253, 931.4, 8.0, 1000000, 0, 0],
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

BenchmarkSearch/LinearSearch      7306 N   215740.0 ns/op   8 NumCPU   1000000 items/count   0 B/op   0 allocs/op
BenchmarkSearch/BinarySearch   7995318 N      149.5 ns/op   8 NumCPU   1000000 items/count   0 B/op   0 allocs/op
BenchmarkSearch/JumpSearch     1542253 N      931.4 ns/op   8 NumCPU   1000000 items/count   0 B/op   0 allocs/op
`;

    expect(result).toStrictEqual(expected);
  });
});

describe('benchmark/asMarkdown', () => {
  test('should format built-in example', () => {
    const result = asMarkdown(parse(example));

    const expected =
      '| Benchmark                      |         N |      ns/op |   NumCPU |   items/count |   B/op |   allocs/op |\n' +
      '|:-------------------------------|----------:|-----------:|---------:|--------------:|-------:|------------:|\n' +
      '| `BenchmarkSearch/LinearSearch` |    `7306` | `215740.0` |      `8` |     `1000000` |    `0` |         `0` |\n' +
      '| `BenchmarkSearch/BinarySearch` | `7995318` |    `149.5` |      `8` |     `1000000` |    `0` |         `0` |\n' +
      '| `BenchmarkSearch/JumpSearch`   | `1542253` |    `931.4` |      `8` |     `1000000` |    `0` |         `0` |\n';

    expect(result).toStrictEqual(expected);
  });
});

describe('benchmark/wrapIntoComments', () => {
  test('should wrap each line in C-style comments', () => {
    const input = `goos: darwin
goarch: arm64
pkg: goscope.net/pprof/go-examples/benchmark
cpu: Apple M2

BenchmarkSearch/LinearSearch      7406 N   215740.0 ns/op   8 NumCPU   1000000 items/count   0 B/op   0 allocs/op
BenchmarkSearch/BinarySearch   7995318 N      149.5 ns/op   8 NumCPU   1000000 items/count   0 B/op   0 allocs/op
BenchmarkSearch/JumpSearch     1542253 N      931.4 ns/op   8 NumCPU   1000000 items/count   0 B/op   0 allocs/op
`;
    const result = wrapIntoComments(input);

    const expected = `// goos: darwin
// goarch: arm64
// pkg: goscope.net/pprof/go-examples/benchmark
// cpu: Apple M2
//
// BenchmarkSearch/LinearSearch      7406 N   215740.0 ns/op   8 NumCPU   1000000 items/count   0 B/op   0 allocs/op
// BenchmarkSearch/BinarySearch   7995318 N      149.5 ns/op   8 NumCPU   1000000 items/count   0 B/op   0 allocs/op
// BenchmarkSearch/JumpSearch     1542253 N      931.4 ns/op   8 NumCPU   1000000 items/count   0 B/op   0 allocs/op`;
    expect(result).toStrictEqual(expected);
  });
});
