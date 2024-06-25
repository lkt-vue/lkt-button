export declare class ButtonOption {
    key: string;
    text: string;
    onClick: Function | undefined;
    autoToggleParent: boolean;
    constructor(key: string, text: string);
    setOnClick(fn: Function): this;
    setAutoToggleParentAfterClick(enabled?: boolean): this;
}
