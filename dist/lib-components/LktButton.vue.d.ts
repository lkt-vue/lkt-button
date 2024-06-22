import { ButtonType } from "../enums/enums";
import { LktObject } from "lkt-ts-interfaces";
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    type?: ButtonType | undefined;
    name?: string | undefined;
    onClickTo?: string | undefined;
    onClickToExternal?: boolean | undefined;
    class?: string | undefined;
    palette?: string | undefined;
    value?: string | undefined;
    disabled?: boolean | undefined;
    loading?: boolean | undefined;
    wrapContent?: boolean | undefined;
    split?: boolean | undefined;
    isAnchor?: boolean | undefined;
    resource?: string | undefined;
    resourceData?: LktObject | undefined;
    modal?: string | undefined;
    modalKey?: string | undefined;
    modalData?: LktObject | undefined;
    confirmModal?: string | undefined;
    confirmModalKey?: string | undefined;
    confirmData?: LktObject | undefined;
}>, {
    type: ButtonType;
    name: string;
    palette: string;
    onClickTo: string;
    onClickToExternal: boolean;
    class: string;
    value: string;
    disabled: boolean;
    loading: boolean;
    wrapContent: boolean;
    split: boolean;
    isAnchor: boolean;
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
    name?: string | undefined;
    onClickTo?: string | undefined;
    onClickToExternal?: boolean | undefined;
    class?: string | undefined;
    palette?: string | undefined;
    value?: string | undefined;
    disabled?: boolean | undefined;
    loading?: boolean | undefined;
    wrapContent?: boolean | undefined;
    split?: boolean | undefined;
    isAnchor?: boolean | undefined;
    resource?: string | undefined;
    resourceData?: LktObject | undefined;
    modal?: string | undefined;
    modalKey?: string | undefined;
    modalData?: LktObject | undefined;
    confirmModal?: string | undefined;
    confirmModalKey?: string | undefined;
    confirmData?: LktObject | undefined;
}>, {
    type: ButtonType;
    name: string;
    palette: string;
    onClickTo: string;
    onClickToExternal: boolean;
    class: string;
    value: string;
    disabled: boolean;
    loading: boolean;
    wrapContent: boolean;
    split: boolean;
    isAnchor: boolean;
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
    split: boolean;
    type: ButtonType;
    name: string;
    value: string;
    loading: boolean;
    disabled: boolean;
    class: string;
    resource: string;
    onClickTo: string;
    onClickToExternal: boolean;
    palette: string;
    wrapContent: boolean;
    isAnchor: boolean;
    resourceData: LktObject;
    modal: string;
    modalKey: string;
    modalData: LktObject;
    confirmModal: string;
    confirmModalKey: string;
    confirmData: LktObject;
}, {}>, Partial<Record<any, (_: {}) => any>> & {
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
