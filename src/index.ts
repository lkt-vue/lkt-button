/* eslint-disable import/prefer-default-export */
import {default as button} from "./lib-components/LktButton.vue";
import {isObject, isString} from "lkt-tools";
import {setDefaultState} from "./functions/settings-functions";
import {App} from "vue";

const LktButton = {
    install: (app: App, options: any) => {
        app.component('lkt-button', button);

        if (isObject(options) && isString(options.defaultState)) {
            setDefaultState(options.defaultState);
        }
    },
};

export default LktButton;