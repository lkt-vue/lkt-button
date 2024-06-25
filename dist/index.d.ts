import { Plugin } from 'vue';
import "../style.css";
import { ButtonOption } from "./classes/ButtonOption";
declare const LktButton: Plugin;
export default LktButton;
export { setDefaultButtonPalette, debugLktButton } from "./functions/settings-functions";
export declare const createButtonOption: (key: string, text: string) => ButtonOption;
