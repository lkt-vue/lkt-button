/* eslint-disable import/prefer-default-export */
import { App } from 'vue';

import { InstallOptions } from './interfaces/InstallOptions';
import { default as button } from './lib-components/LktButton.vue';
import { Settings } from './settings/Settings';

const LktButton = {
  install: (app: App, options?: InstallOptions) => {
    app.component('lkt-button', button);

    if (options && options.defaultState) {
      Settings.DEFAULT_STATE = options.defaultState;
    }
  },
};

export default LktButton;
