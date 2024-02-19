import { Settings } from '../settings/Settings';

export const setDefaultButtonPalette = (palette: string): void => {
  Settings.DEFAULT_PALETTE = palette;
};
