// eslint-disable-next-line import/no-unresolved
import {assertNever} from "lkt-tools";

import { ButtonType } from '../enums/enums';

export const isValidButtonType = (value: ButtonType): boolean => {
  switch (value) {
    case ButtonType.button:
    case ButtonType.reset:
    case ButtonType.submit:
      return true;
    default:
      assertNever(value);
  }
  return false;
};
