import { Settings } from '../settings/Settings';

export const debugLktButton = (state: boolean = true): void => {
  Settings.debugEnabled = state;
};

export const debug = (...args: any[]): void => {
  if (Settings.debugEnabled) console.info('[LktButton] ', ...args);
};

