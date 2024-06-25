declare function Ee(t: any, s: any): {
    key: any;
    text: any;
    autoToggleParent: boolean;
    setOnClick: (s: any) => me;
    onClick: any;
    setAutoToggleParentAfterClick: (s?: boolean) => me;
};
declare function De(t?: boolean): void;
declare namespace Te {
    function install(t: any): void;
}
declare function we(t: any): void;
declare class me {
    constructor(s: any, y: any);
    key: any;
    text: any;
    autoToggleParent: boolean;
    setOnClick(s: any): this;
    onClick: any;
    setAutoToggleParentAfterClick(s?: boolean): this;
}
export { Ee as createButtonOption, De as debugLktButton, Te as default, we as setDefaultButtonPalette };
