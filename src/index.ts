import { App, Plugin } from 'vue';

import "./../lkt-button.css";

import { InstallOptions } from './interfaces/InstallOptions';
import { default as button } from './lib-components/LktButton.vue';
import { Settings } from './settings/Settings';
import LktModalConfirm from "lkt-modal-confirm";

const LktButton: Plugin = {
  install: (app: App, options?: InstallOptions) => {
    // Register plugin components
    if (app.component('lkt-button') === undefined) app.component('lkt-button', button);

    // Plugin configuration
    if (options && options.defaultState) {
      Settings.DEFAULT_STATE = options.defaultState;
    }

    // Register additional components
    if (app.component('lkt-modal-confirm') === undefined)  app.use(LktModalConfirm);
  },
};

export default LktButton;
