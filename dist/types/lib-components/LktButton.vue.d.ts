import { PropType } from "vue";
import { ButtonType } from "../enums/enums";
declare const _default: {
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
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
        resource: {
            type: StringConstructor;
            default: string;
        };
        resourceData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        confirmModal: {
            type: StringConstructor;
            default: string;
        };
        confirmModalKey: {
            type: StringConstructor;
            default: string;
        };
        confirmData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
    }>> & {
        onClick?: ((...args: any[]) => any) | undefined;
        onLoaded?: ((...args: any[]) => any) | undefined;
        onLoading?: ((...args: any[]) => any) | undefined;
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("loaded" | "loading" | "click")[], import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
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
        resource: {
            type: StringConstructor;
            default: string;
        };
        resourceData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        confirmModal: {
            type: StringConstructor;
            default: string;
        };
        confirmModalKey: {
            type: StringConstructor;
            default: string;
        };
        confirmData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
    }>> & {
        onClick?: ((...args: any[]) => any) | undefined;
        onLoaded?: ((...args: any[]) => any) | undefined;
        onLoading?: ((...args: any[]) => any) | undefined;
    }, {
        type: ButtonType;
        name: string;
        value: string;
        loading: boolean;
        disabled: boolean;
        resource: string;
        palette: string;
        wrapContent: boolean;
        resourceData: Record<string, any>;
        confirmModal: string;
        confirmModalKey: string;
        confirmData: Record<string, any>;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
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
        resource: {
            type: StringConstructor;
            default: string;
        };
        resourceData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        confirmModal: {
            type: StringConstructor;
            default: string;
        };
        confirmModalKey: {
            type: StringConstructor;
            default: string;
        };
        confirmData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
    }>> & {
        onClick?: ((...args: any[]) => any) | undefined;
        onLoaded?: ((...args: any[]) => any) | undefined;
        onLoading?: ((...args: any[]) => any) | undefined;
    }, {}, {}, {}, {}, {
        type: ButtonType;
        name: string;
        value: string;
        loading: boolean;
        disabled: boolean;
        resource: string;
        palette: string;
        wrapContent: boolean;
        resourceData: Record<string, any>;
        confirmModal: string;
        confirmModalKey: string;
        confirmData: Record<string, any>;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
    resource: {
        type: StringConstructor;
        default: string;
    };
    resourceData: {
        type: ObjectConstructor;
        required: false;
        default: () => {};
    };
    confirmModal: {
        type: StringConstructor;
        default: string;
    };
    confirmModalKey: {
        type: StringConstructor;
        default: string;
    };
    confirmData: {
        type: ObjectConstructor;
        required: false;
        default: () => {};
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
    onLoaded?: ((...args: any[]) => any) | undefined;
    onLoading?: ((...args: any[]) => any) | undefined;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("loaded" | "loading" | "click")[], "loaded" | "loading" | "click", {
    type: ButtonType;
    name: string;
    value: string;
    loading: boolean;
    disabled: boolean;
    resource: string;
    palette: string;
    wrapContent: boolean;
    resourceData: Record<string, any>;
    confirmModal: string;
    confirmModalKey: string;
    confirmData: Record<string, any>;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        prev: (_: {}) => any;
        default: (_: {}) => any;
        next: (_: {}) => any;
    };
});
export default _default;
