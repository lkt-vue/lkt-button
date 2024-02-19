import {App, Plugin} from 'vue';

import "./../lkt-button.css";
import {default as button} from './lib-components/LktButton.vue';
import LktModalConfirm from "lkt-modal-confirm";

const LktButton: Plugin = {
  install: (app: App) => {
    // Register plugin components
    if (app.component('lkt-button') === undefined) app.component('lkt-button', button);

    // Register additional components
    if (app.component('lkt-modal-confirm') === undefined)  app.use(LktModalConfirm);
  }
};

export default LktButton;
export {setDefaultButtonPalette} from "./functions/settings-functions";
