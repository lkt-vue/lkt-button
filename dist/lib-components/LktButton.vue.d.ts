import { ButtonType } from "../enums/enums";
import { LktObject } from "lkt-ts-interfaces";
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    type?: ButtonType | undefined;
    name?: string | undefined;
    onClickTo?: string | undefined;
    onClickToExternal?: boolean | undefined;
    class?: string | undefined;
    containerClass?: string | undefined;
    palette?: string | undefined;
    value?: string | undefined;
    disabled?: boolean | undefined;
    loading?: boolean | undefined;
    wrapContent?: boolean | undefined;
    split?: boolean | undefined;
    splitIcon?: string | undefined;
    isAnchor?: boolean | undefined;
    resource?: string | undefined;
    resourceData?: LktObject | undefined;
    modal?: string | undefined;
    modalKey?: string | undefined;
    modalData?: LktObject | undefined;
    confirmModal?: string | undefined;
    confirmModalKey?: string | undefined;
    confirmData?: LktObject | undefined;
    text?: string | undefined;
    icon?: string | undefined;
    iconEnd?: string | undefined;
    img?: string | undefined;
    newTab?: boolean | undefined;
    download?: boolean | undefined;
    downloadFileName?: string | undefined;
    showSwitch?: false | undefined;
    hiddenSwitch?: false | undefined;
    tooltip?: boolean | undefined;
    showTooltipOnHover?: boolean | undefined;
    showTooltipOnHoverDelay?: number | undefined;
    hideTooltipOnLeave?: boolean | undefined;
    tooltipWindowMargin?: number | undefined;
    tooltipReferrerMargin?: number | undefined;
    tooltipClass?: string | undefined;
    tooltipLocationY?: string | undefined;
    tooltipLocationX?: string | undefined;
    splitClass?: string | undefined;
    checked?: boolean | undefined;
}>, {
    type: ButtonType;
    name: string;
    palette: string;
    onClickTo: string;
    onClickToExternal: boolean;
    class: string;
    containerClass: string;
    value: string;
    disabled: boolean;
    loading: boolean;
    wrapContent: boolean;
    split: boolean;
    splitIcon: string;
    isAnchor: boolean;
    resource: string;
    resourceData: () => {};
    modal: string;
    modalKey: string;
    modalData: () => {};
    confirmModal: string;
    confirmModalKey: string;
    confirmData: () => {};
    text: string;
    icon: string;
    iconEnd: string;
    img: string;
    newTab: boolean;
    download: boolean;
    downloadFileName: string;
    showSwitch: boolean;
    tooltip: boolean;
    showTooltipOnHoverDelay: number;
    tooltipWindowMargin: number;
    tooltipReferrerMargin: number;
    tooltipLocationY: string;
    tooltipLocationX: string;
    checked: boolean;
}>, {
    click: () => void | Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    loaded: (...args: any[]) => void;
    loading: (...args: any[]) => void;
    click: (...args: any[]) => void;
    "update:checked": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    type?: ButtonType | undefined;
    name?: string | undefined;
    onClickTo?: string | undefined;
    onClickToExternal?: boolean | undefined;
    class?: string | undefined;
    containerClass?: string | undefined;
    palette?: string | undefined;
    value?: string | undefined;
    disabled?: boolean | undefined;
    loading?: boolean | undefined;
    wrapContent?: boolean | undefined;
    split?: boolean | undefined;
    splitIcon?: string | undefined;
    isAnchor?: boolean | undefined;
    resource?: string | undefined;
    resourceData?: LktObject | undefined;
    modal?: string | undefined;
    modalKey?: string | undefined;
    modalData?: LktObject | undefined;
    confirmModal?: string | undefined;
    confirmModalKey?: string | undefined;
    confirmData?: LktObject | undefined;
    text?: string | undefined;
    icon?: string | undefined;
    iconEnd?: string | undefined;
    img?: string | undefined;
    newTab?: boolean | undefined;
    download?: boolean | undefined;
    downloadFileName?: string | undefined;
    showSwitch?: false | undefined;
    hiddenSwitch?: false | undefined;
    tooltip?: boolean | undefined;
    showTooltipOnHover?: boolean | undefined;
    showTooltipOnHoverDelay?: number | undefined;
    hideTooltipOnLeave?: boolean | undefined;
    tooltipWindowMargin?: number | undefined;
    tooltipReferrerMargin?: number | undefined;
    tooltipClass?: string | undefined;
    tooltipLocationY?: string | undefined;
    tooltipLocationX?: string | undefined;
    splitClass?: string | undefined;
    checked?: boolean | undefined;
}>, {
    type: ButtonType;
    name: string;
    palette: string;
    onClickTo: string;
    onClickToExternal: boolean;
    class: string;
    containerClass: string;
    value: string;
    disabled: boolean;
    loading: boolean;
    wrapContent: boolean;
    split: boolean;
    splitIcon: string;
    isAnchor: boolean;
    resource: string;
    resourceData: () => {};
    modal: string;
    modalKey: string;
    modalData: () => {};
    confirmModal: string;
    confirmModalKey: string;
    confirmData: () => {};
    text: string;
    icon: string;
    iconEnd: string;
    img: string;
    newTab: boolean;
    download: boolean;
    downloadFileName: string;
    showSwitch: boolean;
    tooltip: boolean;
    showTooltipOnHoverDelay: number;
    tooltipWindowMargin: number;
    tooltipReferrerMargin: number;
    tooltipLocationY: string;
    tooltipLocationX: string;
    checked: boolean;
}>>> & {
    onClick?: ((...args: any[]) => any) | undefined;
    onLoaded?: ((...args: any[]) => any) | undefined;
    onLoading?: ((...args: any[]) => any) | undefined;
    "onUpdate:checked"?: ((...args: any[]) => any) | undefined;
}, {
    split: boolean;
    type: ButtonType;
    name: string;
    value: string;
    loading: boolean;
    img: string;
    text: string;
    disabled: boolean;
    class: string;
    icon: string;
    tooltip: boolean;
    resource: string;
    download: boolean;
    checked: boolean;
    onClickTo: string;
    onClickToExternal: boolean;
    containerClass: string;
    palette: string;
    wrapContent: boolean;
    splitIcon: string;
    isAnchor: boolean;
    resourceData: LktObject;
    modal: string;
    modalKey: string;
    modalData: LktObject;
    confirmModal: string;
    confirmModalKey: string;
    confirmData: LktObject;
    iconEnd: string;
    newTab: boolean;
    downloadFileName: string;
    showSwitch: false;
    showTooltipOnHoverDelay: number;
    tooltipWindowMargin: number;
    tooltipReferrerMargin: number;
    tooltipLocationY: string;
    tooltipLocationX: string;
}, {}>, {
    default?(_: {}): any;
    split?(_: {
        doClose: any;
    }): any;
    tooltip?(_: {
        doClose: any;
    }): any;
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
