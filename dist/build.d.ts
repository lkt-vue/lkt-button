declare function Le(o: any, a: any): {
    key: any;
    text: any;
    classes: string;
    containerClasses: string;
    autoToggleParent: boolean;
    setOnClick: (a: any) => z;
    onClick: any;
    setAutoToggleParentAfterClick: (a?: boolean) => z;
    setClassGenerator: (a: any) => z;
    classGenerator: any;
    setClasses: (a: any) => z;
    setContainerClasses: (a: any) => z;
};
declare function Ee(o?: boolean): void;
declare namespace Be {
    function install(o: any): void;
}
declare function Te(o: any): void;
declare class z {
    constructor(a: any, E: any);
    key: any;
    text: any;
    classes: string;
    containerClasses: string;
    autoToggleParent: boolean;
    setOnClick(a: any): this;
    onClick: any;
    setAutoToggleParentAfterClick(a?: boolean): this;
    setClassGenerator(a: any): this;
    classGenerator: any;
    setClasses(a: any): this;
    setContainerClasses(a: any): this;
}
export { Le as createButtonOption, Ee as debugLktButton, Be as default, Te as setDefaultButtonPalette };
