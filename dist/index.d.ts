import { Component, Plugin } from 'vue';
import "../style.css";
declare const LktButton: Plugin;
export default LktButton;
export { setDefaultButtonPalette, debugLktButton } from "./functions/settings-functions";
export declare const setDefaultButtonSplitSlot: (component?: string | Component) => void;
