import axios from 'axios';
import { GoroutineProfile } from './model';
import { parse } from './parser';

const FETCH_TIMEOUT_MS = 15_000;
const MAX_RESPONSE_BYTES = 10 * 1024 * 1024;

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

  const response = await axios.get<string>(url, {
    responseType: 'text',
    validateStatus: () => true,
    timeout: FETCH_TIMEOUT_MS,
    maxContentLength: MAX_RESPONSE_BYTES
  });
  if (response.status !== 200) {
    throw new Error(`Failed to fetch "${url}": ${response.statusText}`);
  }

  const profile = parse(response.data);
  profile.url = url;
  return profile;
};
