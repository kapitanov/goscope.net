import { featureFlags as raw } from '../config';

const featureFlagValue = new Map<string, boolean>();
for (const flag of raw as string[]) {
  const normalizedFlag = flag.replace('FEATURE_', '').toLowerCase();
  featureFlagValue.set(normalizedFlag, true);
}

export function isFeatureEnabled(feature: string): boolean {
  let isEnabled: boolean;
  if (raw.length === 0) {
    isEnabled = true;
  } else {
    isEnabled = featureFlagValue.get(feature) || false;
  }

  console.log(`Feature flag "${feature}" is ${isEnabled ? 'enabled' : 'disabled'}`);
  return isEnabled;
}

export const features = {
  GOROUTINES: 'goroutines',
  DEMO: 'demo'
};

export const useFeatureFlag = (name: string): boolean => {
  return isFeatureEnabled(name);
};
