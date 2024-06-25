declare function Be(o: any, l: any): {
    key: any;
    text: any;
    classes: string;
    containerClasses: string;
    autoToggleParent: boolean;
    setOnClick: (l: any) => K;
    onClick: any;
    setAutoToggleParentAfterClick: (l?: boolean) => K;
    setClassGenerator: (l: any) => K;
    classGenerator: any;
    setClasses: (l: any) => K;
    setContainerClasses: (l: any) => K;
};
declare function Te(o?: boolean): void;
declare namespace Ee {
    function install(o: any): void;
}
declare function De(o: any): void;
declare class K {
    constructor(l: any, D: any);
    key: any;
    text: any;
    classes: string;
    containerClasses: string;
    autoToggleParent: boolean;
    setOnClick(l: any): this;
    onClick: any;
    setAutoToggleParentAfterClick(l?: boolean): this;
    setClassGenerator(l: any): this;
    classGenerator: any;
    setClasses(l: any): this;
    setContainerClasses(l: any): this;
}
export { Be as createButtonOption, Te as debugLktButton, Ee as default, De as setDefaultButtonPalette };
