export interface GoroutineStackFrame {
  function: string;
  file: string;
  line?: number;
  offset?: string;
}

export interface Goroutine {
  id: number;
  state: string;
  stack: GoroutineStackFrame[];
}

export interface GoroutineProfile {
  items: Goroutine[];
}

export const parse = (input: string): GoroutineProfile => {
  if (input.match(/^\s*$/)) {
    throw new Error('Input is empty!');
  }

  return parseGoroutineProfile(input);
};

function parseGoroutineProfile(input: string): GoroutineProfile {
  const goroutines: Goroutine[] = [];

  const reader = new TextReader(input);
  while (!reader.eof()) {
    const goroutine = parseGoroutine(reader);
    if (!goroutine) {
      break;
    }

    goroutines.push(goroutine);

    if (!reader.advance()) {
      break;
    }
  }

  if (goroutines.length === 0) {
    throw new Error('Input is empty!');
  }

  goroutines.sort((a, b) => a.id - b.id);

  return { items: goroutines };
}

function parseGoroutine(reader: TextReader): Goroutine | null {
  if (reader.eof()) {
    return null;
  }

  const matchGoRoutine =
    reader.match(/^goroutine (\d+) \[([^:]+)\]:$/) ||
    reader.fail('expected a goroutine header');
  const goroutine: Goroutine = {
    id: parseInt(matchGoRoutine[1]),
    state: matchGoRoutine[2],
    stack: []
  };

  while (reader.advance()) {
    if (reader.match(/^\s*$/)) {
      break;
    }

    const functionName = reader.peek();
    if (!reader.advance()) {
      reader.fail('expected a goroutine stack frame');
    }

    const matchStack =
      reader.match(/^\s+([^:]+):?(\d*)\s?([^$]*)$/) ||
      reader.fail('expected a goroutine stack frame');
    const stackFrame: GoroutineStackFrame = {
      function: functionName,
      file: matchStack[1],
      line: parseInt(matchStack[2] || '0'),
      offset: matchStack[3]
    };
    goroutine.stack.push(stackFrame);
  }

  return goroutine;
}

class TextReader {
  private lines: string[];
  private i: number;

  constructor(input: string) {
    this.lines = input.split('\n');
    this.i = 0;
  }

  eof(): boolean {
    return this.i >= this.lines.length;
  }

  peek(): string {
    if (this.eof()) {
      return '';
    }

    return this.lines[this.i];
  }

  match(matcher: {
    [Symbol.match](string: string): RegExpMatchArray | null;
  }): RegExpMatchArray | null {
    return this.peek().match(matcher);
  }

  advance(): boolean {
    this.i++;
    return !this.eof();
  }

  fail(message: string): never {
    throw new Error(`At line ${this.i + 1}: ${message}. See: "${this.peek()}"`);
  }
}
