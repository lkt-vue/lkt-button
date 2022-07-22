import {LktButtonSettings} from "../settings/LktButtonSettings";
import {trim} from "lkt-tools";

export const setDefaultState = (state: string): void => {
    LktButtonSettings.DEFAULT_STATE = trim(state, undefined);
}

export const getDefaultButtonState = (): string => {
    return LktButtonSettings.DEFAULT_STATE;
}