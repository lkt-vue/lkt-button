import { ComponentPublicInstance, SetupContext } from 'vue';
import { ButtonConfig, ButtonType, FieldType, LktObject, ModalConfig } from 'lkt-vue-kernel';
declare const slots: SetupContext['slots'];
declare const Identifier: string;
declare const isLoading: import("vue").Ref<boolean, boolean>, container: import("vue").Ref<Element | ComponentPublicInstance | null, Element | ComponentPublicInstance | null>, button: import("vue").Ref<Element | ComponentPublicInstance | null, Element | ComponentPublicInstance | null>, showDropdown: import("vue").Ref<boolean, boolean>, showTooltip: import("vue").Ref<boolean, boolean>, isHovered: import("vue").Ref<boolean, boolean>, isChecked: import("vue").Ref<boolean, boolean>, fileFieldValue: import("vue").Ref<undefined, undefined>, fileFieldRef: import("vue").Ref<ComponentPublicInstance | null, ComponentPublicInstance | null>;
declare const computedContainerClass: import("vue").ComputedRef<string>, computedText: import("vue").ComputedRef<any>, computedIcon: import("vue").ComputedRef<import("lkt-vue-kernel").ValidScanPropTarget>, computedIconEnd: import("vue").ComputedRef<import("lkt-vue-kernel").ValidScanPropTarget>, hasCustomSplitIconSlot: import("vue").ComputedRef<boolean>, customSplitIconSlot: import("vue").ComputedRef<string | import("vue").Component | undefined>, computedIconDotText: import("vue").ComputedRef<string | number>;
declare const computedResourceData: import("vue").ComputedRef<any>;
declare const computedRenderTooltip: import("vue").ComputedRef<boolean>;
declare const computedRenderSplit: import("vue").ComputedRef<boolean>;
declare const onFocus: ($event: FocusEvent) => void;
declare const onBlur: ($event: Event) => void;
declare const canRenderSwitch: import("vue").ComputedRef<boolean>, canDisplaySwitch: import("vue").ComputedRef<boolean>, isFileUpload: import("vue").ComputedRef<boolean>, computedFileUploadType: import("vue").ComputedRef<FieldType.File | FieldType.Image>;
declare const computedIsSplit: import("vue").ComputedRef<boolean>;
declare const computedIsTooltip: import("vue").ComputedRef<boolean>;
declare const doClick: ($event: MouseEvent | null) => void | Promise<void>;
declare const computedButtonComponent: import("vue").ComputedRef<"button" | "div">;
declare const computedComponentType: import("vue").ComputedRef<"button" | ButtonType.Button | ButtonType.Submit>;
declare const computedIsDisabled: import("vue").ComputedRef<boolean>;
declare const doRootClick: ($event: MouseEvent) => void | Promise<void>;
declare const onRouteActive: (v: any) => any;
declare const computedIsAnchor: import("vue").ComputedRef<boolean>;
declare const computedAnchor: import("vue").ComputedRef<{}>;
declare const __VLS_ctx: InstanceType<__VLS_PickNotAny<typeof __VLS_self, new () => {}>>;
declare var __VLS_9: {
    text: any;
}, __VLS_11: {}, __VLS_33: {
    text: any;
}, __VLS_35: {}, __VLS_79: {
    doClose: any;
    doRootClick: ($event: MouseEvent) => void | Promise<void>;
}, __VLS_93: {
    doClose: any;
    doRootClick: ($event: MouseEvent) => void | Promise<void>;
};
type __VLS_Slots = __VLS_PrettifyGlobal<__VLS_OmitStringIndex<typeof __VLS_ctx.$slots> & {
    text?: (props: typeof __VLS_9) => any;
} & {
    default?: (props: typeof __VLS_11) => any;
} & {
    text?: (props: typeof __VLS_33) => any;
} & {
    default?: (props: typeof __VLS_35) => any;
} & {
    split?: (props: typeof __VLS_79) => any;
} & {
    tooltip?: (props: typeof __VLS_93) => any;
}>;
declare const __VLS_self: import("vue").DefineComponent<ButtonConfig, {
    slots: typeof slots;
    Identifier: typeof Identifier;
    isLoading: typeof isLoading;
    container: typeof container;
    button: typeof button;
    showDropdown: typeof showDropdown;
    showTooltip: typeof showTooltip;
    isHovered: typeof isHovered;
    isChecked: typeof isChecked;
    fileFieldValue: typeof fileFieldValue;
    fileFieldRef: typeof fileFieldRef;
    computedContainerClass: typeof computedContainerClass;
    computedText: typeof computedText;
    computedIcon: typeof computedIcon;
    computedIconEnd: typeof computedIconEnd;
    hasCustomSplitIconSlot: typeof hasCustomSplitIconSlot;
    customSplitIconSlot: typeof customSplitIconSlot;
    computedIconDotText: typeof computedIconDotText;
    computedResourceData: typeof computedResourceData;
    computedRenderTooltip: typeof computedRenderTooltip;
    computedRenderSplit: typeof computedRenderSplit;
    onFocus: typeof onFocus;
    onBlur: typeof onBlur;
    canRenderSwitch: typeof canRenderSwitch;
    canDisplaySwitch: typeof canDisplaySwitch;
    isFileUpload: typeof isFileUpload;
    computedFileUploadType: typeof computedFileUploadType;
    computedIsSplit: typeof computedIsSplit;
    computedIsTooltip: typeof computedIsTooltip;
    doClick: typeof doClick;
    computedButtonComponent: typeof computedButtonComponent;
    computedComponentType: typeof computedComponentType;
    computedIsDisabled: typeof computedIsDisabled;
    doRootClick: typeof doRootClick;
    onRouteActive: typeof onRouteActive;
    computedIsAnchor: typeof computedIsAnchor;
    computedAnchor: typeof computedAnchor;
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
    anchor: import("lkt-vue-kernel").AnchorConfig;
    name: string;
    type: ButtonType;
    value: string;
    loading: boolean;
    img: string;
    text: string | number;
    disabled: boolean | import("lkt-vue-kernel").IsDisabledChecker;
    class: string;
    dot: import("lkt-vue-kernel").ValidButtonDot;
    icon: string;
    tooltip: import("lkt-vue-kernel").TooltipConfig;
    tabindex: string | number;
    resource: string;
    checked: boolean;
    modal: string | Function;
    modalKey: string | number | Function;
    confirmModal: string | Function;
    confirmModalKey: string | number | Function;
    confirmData: Partial<ModalConfig>;
    events: {
        click?: (data: import("lkt-vue-kernel").ClickEventArgs) => void | undefined;
        httpStart?: undefined | Function;
        httpEnd?: (data: import("lkt-vue-kernel").ClickEventArgs) => void | undefined;
    };
    prop: LktObject;
    openTooltip: boolean;
    containerClass: string;
    wrapContent: boolean;
    iconEnd: string;
    textOn: string | number;
    textOff: string | number;
    iconOn: string | number;
    iconOff: string | number;
    iconEndOn: string | number;
    iconEndOff: string | number;
    resourceData: LktObject;
    modalData: Partial<ModalConfig> | Function;
    modalCallbacks: Array<import("lkt-vue-kernel").ModalCallbackConfig>;
    splitIcon: string;
    showTooltipOnHover: boolean;
    showTooltipOnHoverDelay: number;
    hideTooltipOnLeave: boolean;
    splitClass: string;
    splitButtons: Array<ButtonConfig>;
    clickRef: Element | import("vue").VueElement;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
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
    anchor: import("lkt-vue-kernel").AnchorConfig;
    name: string;
    type: ButtonType;
    value: string;
    loading: boolean;
    img: string;
    text: string | number;
    disabled: boolean | import("lkt-vue-kernel").IsDisabledChecker;
    class: string;
    dot: import("lkt-vue-kernel").ValidButtonDot;
    icon: string;
    tooltip: import("lkt-vue-kernel").TooltipConfig;
    tabindex: string | number;
    resource: string;
    checked: boolean;
    modal: string | Function;
    modalKey: string | number | Function;
    confirmModal: string | Function;
    confirmModalKey: string | number | Function;
    confirmData: Partial<ModalConfig>;
    events: {
        click?: (data: import("lkt-vue-kernel").ClickEventArgs) => void | undefined;
        httpStart?: undefined | Function;
        httpEnd?: (data: import("lkt-vue-kernel").ClickEventArgs) => void | undefined;
    };
    prop: LktObject;
    openTooltip: boolean;
    containerClass: string;
    wrapContent: boolean;
    iconEnd: string;
    textOn: string | number;
    textOff: string | number;
    iconOn: string | number;
    iconOff: string | number;
    iconEndOn: string | number;
    iconEndOff: string | number;
    resourceData: LktObject;
    modalData: Partial<ModalConfig> | Function;
    modalCallbacks: Array<import("lkt-vue-kernel").ModalCallbackConfig>;
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
