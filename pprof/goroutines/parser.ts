import { GoroutineProfile, Goroutine, GoroutineStackFrame } from './model';

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

  return { items: goroutines, total: goroutines.length };
}

function parseGoroutine(reader: TextReader): Goroutine | null {
  if (reader.eof()) {
    return null;
  }

  const matchGoRoutine = reader.match(/^goroutine (\d+) \[([^:]+)\]:$/) || reader.fail('expected a goroutine header');
  const goroutine: Goroutine = {
    id: parseInt(matchGoRoutine[1]),
    state: matchGoRoutine[2],
    stack: [],
    text: ''
  };

  while (reader.advance()) {
    if (reader.match(/^\s*$/)) {
      break;
    }

    const functionName = reader.peek();
    if (!reader.advance()) {
      reader.fail('expected a goroutine stack frame');
    }

    const matchStack = reader.match(/^\s+([^:]+):?(\d*)\s?([^$]*)$/) || reader.fail('expected a goroutine stack frame');
    const stackFrame: GoroutineStackFrame = {
      function: functionName,
      file: matchStack[1],
      line: parseInt(matchStack[2] || '0'),
      offset: matchStack[3]
    };
    goroutine.stack.push(stackFrame);
  }

  goroutine.text = formatGoroutineText(goroutine);
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

  match(matcher: { [Symbol.match](string: string): RegExpMatchArray | null }): RegExpMatchArray | null {
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

function formatGoroutineText(g: Goroutine): string {
  let str = `goroutine ${g.id} [${g.state}]:`;

  for (const frame of g.stack) {
    str += '\n';
    str += formatGoroutineStackFrameText(frame);
  }

  return str;
}

function formatGoroutineStackFrameText(f: GoroutineStackFrame): string {
  const str = `${f.function}\n\t${f.file}:${f.line} ${f.offset}`;
  return str;
}
