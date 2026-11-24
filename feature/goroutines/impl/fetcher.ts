import { GoroutineProfile } from './model';
import { parse } from './parser';

const FETCH_TIMEOUT_MS = 15_000;
const MAX_RESPONSE_BYTES = 10 * 1024 * 1024;

const readBody = async (response: Response): Promise<string> => {
  if (!response.body) {
    return '';
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let total = 0;
  let text = '';

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      total += value.byteLength;
      if (total > MAX_RESPONSE_BYTES) {
        await reader.cancel();
        throw new Error(`Response is larger than ${MAX_RESPONSE_BYTES} bytes`);
      }

      text += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }

  return text + decoder.decode();
};

export const fetch = async (url: string): Promise<GoroutineProfile> => {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error('Invalid URL');
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error('Only HTTP(S) URLs are supported');
  }

  const response = await globalThis.fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
  });

  if (response.status !== 200) {
    throw new Error(`Failed to fetch "${url}": ${response.statusText}`);
  }

  const profile = parse(await readBody(response));
  profile.url = url;
  return profile;
};
