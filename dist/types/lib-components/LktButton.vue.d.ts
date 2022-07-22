declare const _default: {
    name: string;
    props: {
        type: {
            type: StringConstructor;
            default: string;
            validator: (value: string) => boolean;
        };
        name: {
            type: StringConstructor;
            default: () => string;
        };
        value: {
            type: StringConstructor;
            default: string;
        };
        state: {
            type: StringConstructor;
            default: string;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    methods: {
        onClick(e: any): void;
    };
};
export default _default;
