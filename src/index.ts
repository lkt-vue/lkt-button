import {App, Plugin, reactive} from 'vue';

import "../style.css";
import {default as libComponent} from './lib-components/LktButton.vue';
import {ButtonOption} from "./classes/ButtonOption";

const LktButton: Plugin = {
  install: (app: App) => {
    // Register plugin components
    if (app.component('lkt-button') === undefined) app.component('lkt-button', libComponent);
  }
};

export default LktButton;
export {setDefaultButtonPalette, debugLktButton} from "./functions/settings-functions";


export const createButtonOption = (key: string, text: string): ButtonOption => {
  return reactive(new ButtonOption(key, text));
}