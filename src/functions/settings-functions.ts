import {Settings} from "../settings/Settings";
import {trim} from "lkt-tools";

export const setDefaultState = (state: string): void => {
    Settings.DEFAULT_STATE = trim(state, undefined);
}

export const getDefaultButtonState = (): string => {
    return Settings.DEFAULT_STATE;
}