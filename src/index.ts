import {App, Component, Plugin} from 'vue';

import "../style.css";
import {default as libComponent} from './lib-components/LktButton.vue';
import {Settings} from "./settings/Settings";

const LktButton: Plugin = {
  install: (app: App) => {
    if (app.component('lkt-button') === undefined) app.component('lkt-button', libComponent);
  }
};

export default LktButton;
export {setDefaultButtonPalette, debugLktButton} from "./functions/settings-functions";


export const setDefaultButtonSplitSlot = (component?: string|Component) => {
  Settings.defaultSplitIcon = component;
}