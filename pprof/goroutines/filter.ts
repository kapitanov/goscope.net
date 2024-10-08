import Fuse from 'fuse.js';
import { GoroutineProfile } from './model';

export interface FilterArgs {
  text?: string;
  states?: string[];
}

export const filter = (profile: GoroutineProfile, args: FilterArgs): GoroutineProfile => {
  if (args.text) {
    profile = filterByText(profile, args.text);
  }

  if (args.states && args.states.length > 0) {
    profile = filterByState(profile, args.states);
  }

  return profile;
};

function filterByText(profile: GoroutineProfile, query: string): GoroutineProfile {
  const textDocuments = profile.items.map((goroutine) => ({
    goroutine,
    text: [
      `${goroutine.id}`,
      goroutine.state,
      ...goroutine.stack.map((frame) => {
        return `${frame.function} ${frame.file}`;
      })
    ]
  }));

  const fuse = new Fuse(textDocuments, { keys: ['text'] });
  const results = fuse.search(query);

  return {
    items: results.map((x) => x.item.goroutine),
    url: profile.url,
    text: profile.text,
    total: profile.total
  };
}

function filterByState(profile: GoroutineProfile, states: string[]): GoroutineProfile {
  const results = profile.items.filter((goroutine) => {
    return states.includes(goroutine.state);
  });

  return {
    items: results,
    url: profile.url,
    text: profile.text,
    total: profile.total
  };
}
