export declare class ButtonOption {
    key: string;
    text: string;
    onClick: Function | undefined;
    classes: string;
    containerClasses: string;
    classGenerator: Function | undefined;
    autoToggleParent: boolean;
    constructor(key: string, text: string);
    setOnClick(fn: Function): this;
    setAutoToggleParentAfterClick(enabled?: boolean): this;
    setClassGenerator(fn: Function): this;
    setClasses(classes: string): this;
    setContainerClasses(classes: string): this;
}
