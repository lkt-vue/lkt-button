/* eslint-disable import/prefer-default-export */
import {default as button} from "./lib-components/LktButton.vue";

const LktButton = {
    install: (app: any, options: any) => {
        app.component('LktButton', button);
    },
};

export default LktButton;