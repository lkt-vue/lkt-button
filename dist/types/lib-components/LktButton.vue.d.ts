declare const _default: {
    name: string;
    emits: string[];
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
        state: {
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
        wrapContent: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    computed: {
        hasPrev(): boolean;
        hasNext(): boolean;
    };
    methods: {
        onClick($event: any): void;
    };
};
export default _default;
