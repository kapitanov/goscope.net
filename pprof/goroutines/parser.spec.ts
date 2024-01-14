import { describe, expect, test } from '@jest/globals';
import { parse } from './parser';
import { example } from './example';

describe('goroutines/parser', () => {
  test('should parse built-in example', () => {
    const result = parse(example);
    expect(result.items).toHaveLength(10);
  });

  test('should not parse empty string', () => {
    expect(() => parse('')).toThrow();
  });
});
