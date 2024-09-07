import {App, Component, Plugin} from 'vue';

import "../style.css";
import {default as libComponent} from './lib-components/LktButton.vue';
import {Settings} from "./settings/Settings";
import LktTooltip from "lkt-tooltip";

const LktButton: Plugin = {
  install: (app: App) => {
    // Register plugin dependencies
    if (app.component('lkt-tooltip') === undefined) app.use(LktTooltip);

    // Register plugin components
    if (app.component('lkt-button') === undefined) app.component('lkt-button', libComponent);
  }
};

export default LktButton;
export {setDefaultButtonPalette, debugLktButton} from "./functions/settings-functions";


export const setDefaultButtonSplitSlot = (component?: string|Component) => {
  Settings.defaultSplitIcon = component;
}