import { describe, expect, test } from '@jest/globals';
import { parse } from './parser';
import { example } from './example';

describe('goroutines/parser', () => {
  test('should parse built-in example', () => {
    const result = parse(example);
    expect(result.items).toHaveLength(10);
  });

  test('should generate text for built-in example', () => {
    const result = parse(example);
    const expected = `goroutine 19 [chan send]:
main.main.func1()
	/Users/username/projects/projectname/main.go:24 +0x2c
created by main.main in goroutine 1
	/Users/username/projects/projectname/main.go:23 +0x24`;
    expect(result.items[1].text).toBe(expected);
  });

  test('should not parse empty string', () => {
    expect(() => parse('')).toThrow();
  });
});
