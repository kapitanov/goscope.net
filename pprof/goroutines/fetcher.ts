import { GoroutineProfile, parse } from './parser';
import axios from 'axios';

export const fetch = async (url: string): Promise<GoroutineProfile> => {
  const response = await axios.get<string>(url, {
    responseType: 'text',
    validateStatus: () => true
  });
  if (response.status !== 200) {
    throw new Error(`Failed to fetch "${url}": ${response.statusText}`);
  }

  const profile = parse(response.data);
  profile.url = url;
  return profile;
};
