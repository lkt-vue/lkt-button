import { AnchorConfig, ButtonConfig, ButtonType, IconConfig, LktObject, ModalConfig } from 'lkt-vue-kernel';
declare var __VLS_1: {}, __VLS_11: {
    text: any;
}, __VLS_13: {}, __VLS_35: {
    text: any;
}, __VLS_37: {}, __VLS_81: {
    doClose: any;
    doRootClick: ($event: MouseEvent) => void | Promise<void>;
}, __VLS_95: {
    doClose: any;
    doRootClick: ($event: MouseEvent) => void | Promise<void>;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    text?: (props: typeof __VLS_11) => any;
} & {
    default?: (props: typeof __VLS_13) => any;
} & {
    text?: (props: typeof __VLS_35) => any;
} & {
    default?: (props: typeof __VLS_37) => any;
} & {
    split?: (props: typeof __VLS_81) => any;
} & {
    tooltip?: (props: typeof __VLS_95) => any;
};
declare const __VLS_component: import("vue").DefineComponent<ButtonConfig, {
    click: () => void | Promise<void>;
    focus: (eventless: boolean) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    loaded: (...args: any[]) => void;
    loading: (...args: any[]) => void;
    blur: (...args: any[]) => void;
    click: (...args: any[]) => void;
    focus: (...args: any[]) => void;
    "update:checked": (...args: any[]) => void;
    "update:openTooltip": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<ButtonConfig> & Readonly<{
    onLoaded?: ((...args: any[]) => any) | undefined;
    onLoading?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
    onClick?: ((...args: any[]) => any) | undefined;
    onFocus?: ((...args: any[]) => any) | undefined;
    "onUpdate:checked"?: ((...args: any[]) => any) | undefined;
    "onUpdate:openTooltip"?: ((...args: any[]) => any) | undefined;
}>, {
    anchor: AnchorConfig;
    name: string;
    type: ButtonType;
    value: string;
    loading: boolean;
    img: string;
    text: string | number;
    disabled: boolean | import("lkt-vue-kernel").IsDisabledChecker;
    class: string;
    dot: import("lkt-vue-kernel").ValidIconDot;
    icon: IconConfig | string;
    tooltip: import("lkt-vue-kernel").TooltipConfig;
    tabindex: string | number;
    resource: string;
    checked: boolean;
    modal: string | Function;
    modalKey: string | number | Function;
    modalData: Partial<ModalConfig> | Function;
    prop: LktObject;
    events: {
        click?: (data: import("lkt-vue-kernel").ClickEventArgs) => void | undefined;
        httpStart?: undefined | Function;
        httpEnd?: (data: import("lkt-vue-kernel").ClickEventArgs) => void | undefined;
    };
    confirmModal: string | Function;
    confirmModalKey: string | number | Function;
    confirmData: Partial<ModalConfig>;
    openTooltip: boolean;
    containerClass: string;
    wrapContent: boolean;
    iconEnd: IconConfig | string;
    textOn: string | number;
    textOff: string | number;
    iconOn: string | number | IconConfig;
    iconOff: string | number | IconConfig;
    iconEndOn: string | number | IconConfig;
    iconEndOff: string | number | IconConfig;
    resourceData: LktObject;
    modalCallbacks: Array<import("lkt-vue-kernel").ModalCallbackConfig>;
    menuKey: string | number | Function;
    splitIcon: string;
    showTooltipOnHover: boolean;
    showTooltipOnHoverDelay: number;
    hideTooltipOnLeave: boolean;
    splitClass: string;
    splitButtons: Array<ButtonConfig>;
    clickRef: Element | import("vue").VueElement;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
