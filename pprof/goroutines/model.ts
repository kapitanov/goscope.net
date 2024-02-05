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
  url?: string;
  text?: string;
  total: number;
}
