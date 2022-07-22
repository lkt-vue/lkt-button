import {BUTTON_TYPES} from "../constants";

export const isValidButtonType = (value: string): boolean => {
    return BUTTON_TYPES.indexOf(value) !== -1;
}