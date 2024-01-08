import { GoroutineProfile, Goroutine } from './model';

export interface FilterArgs {
  text?: string;
}

export const filter = (
  profile: GoroutineProfile,
  args: FilterArgs
): GoroutineProfile => {
  const predicate = createGoroutinePredicate(args);
  return {
    items: profile.items.filter(predicate),
    url: profile.url,
    text: profile.text,
    total: profile.total
  };
};

function createGoroutinePredicate(
  args: FilterArgs
): (goroutine: Goroutine) => boolean {
  const predicates: ((goroutine: Goroutine) => boolean)[] = [];

  if (args.text) {
    const filterText = args.text.toLowerCase();
    predicates.push((goroutine: Goroutine) => {
      const text = getGoroutineText(goroutine).toLowerCase();
      return text.includes(filterText);
    });
  }

  return joinGoroutinePredicates(predicates);
}

function joinGoroutinePredicates(
  predicates: ((goroutine: Goroutine) => boolean)[]
): (goroutine: Goroutine) => boolean {
  if (predicates.length === 0) {
    return () => true;
  }

  if (predicates.length === 1) {
    return predicates[0];
  }

  return (goroutine: Goroutine) =>
    predicates.every((predicate) => predicate(goroutine));
}

function getGoroutineText(goroutine: Goroutine): string {
  let text = '';
  const frame = goroutine.stack[0];

  text += `${frame.function}\n`;
  if (frame.file) {
    text += `${frame.file}\n`;
  }

  return text;
}
