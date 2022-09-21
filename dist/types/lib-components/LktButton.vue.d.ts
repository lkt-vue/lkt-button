import { PropType } from "vue";
import { ButtonType } from "../enums/enums";
declare const _default: import("vue").DefineComponent<{
    type: {
        type: PropType<ButtonType>;
        default: ButtonType;
        validator: (value: ButtonType) => boolean;
    };
    name: {
        type: StringConstructor;
        default: () => string;
    };
    palette: {
        type: StringConstructor;
        default: () => string;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    wrapContent: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, unknown, {
    hasPrev(): boolean;
    hasNext(): boolean;
    classes(): string;
}, {
    onClick($event: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: PropType<ButtonType>;
        default: ButtonType;
        validator: (value: ButtonType) => boolean;
    };
    name: {
        type: StringConstructor;
        default: () => string;
    };
    palette: {
        type: StringConstructor;
        default: () => string;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    wrapContent: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    type: ButtonType;
    name: string;
    value: string;
    loading: boolean;
    disabled: boolean;
    palette: string;
    wrapContent: boolean;
}>;
export default _default;
