import { ButtonType } from "../enums/enums";
import { LktObject } from "lkt-ts-interfaces";
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    type?: ButtonType | undefined;
    name: string;
    class: string;
    palette: string;
    value: string;
    disabled: boolean;
    loading: boolean;
    wrapContent: boolean;
    resource: string;
    resourceData?: LktObject | undefined;
    modal: string;
    modalKey: string;
    modalData?: LktObject | undefined;
    confirmModal: string;
    confirmModalKey: string;
    confirmData?: LktObject | undefined;
}>, {
    type: ButtonType;
    name: string;
    palette: string;
    class: string;
    value: string;
    disabled: boolean;
    loading: boolean;
    wrapContent: boolean;
    resource: string;
    resourceData: () => {};
    modal: string;
    modalKey: string;
    modalData: () => {};
    confirmModal: string;
    confirmModalKey: string;
    confirmData: () => {};
}>, {
    click: () => void | Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    loaded: (...args: any[]) => void;
    loading: (...args: any[]) => void;
    click: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    type?: ButtonType | undefined;
    name: string;
    class: string;
    palette: string;
    value: string;
    disabled: boolean;
    loading: boolean;
    wrapContent: boolean;
    resource: string;
    resourceData?: LktObject | undefined;
    modal: string;
    modalKey: string;
    modalData?: LktObject | undefined;
    confirmModal: string;
    confirmModalKey: string;
    confirmData?: LktObject | undefined;
}>, {
    type: ButtonType;
    name: string;
    palette: string;
    class: string;
    value: string;
    disabled: boolean;
    loading: boolean;
    wrapContent: boolean;
    resource: string;
    resourceData: () => {};
    modal: string;
    modalKey: string;
    modalData: () => {};
    confirmModal: string;
    confirmModalKey: string;
    confirmData: () => {};
}>>> & {
    onClick?: ((...args: any[]) => any) | undefined;
    onLoaded?: ((...args: any[]) => any) | undefined;
    onLoading?: ((...args: any[]) => any) | undefined;
}, {
    type: ButtonType;
    name: string;
    value: string;
    loading: boolean;
    disabled: boolean;
    class: string;
    resource: string;
    palette: string;
    wrapContent: boolean;
    resourceData: LktObject;
    modal: string;
    modalKey: string;
    modalData: LktObject;
    confirmModal: string;
    confirmModalKey: string;
    confirmData: LktObject;
}, {}>, {
    prev?(_: {}): any;
    default?(_: {}): any;
    next?(_: {}): any;
}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
