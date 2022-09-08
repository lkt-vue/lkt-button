import { App } from 'vue';
import { InstallOptions } from './interfaces/InstallOptions';
declare const LktButton: {
    install: (app: App, options?: InstallOptions) => void;
};
export default LktButton;
