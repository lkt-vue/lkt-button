export class ButtonOption {
    key: string = '';
    text: string = '';

    onClick: Function|undefined = undefined;

    autoToggleParent: boolean = false;

    constructor(key: string, text: string) {
        this.key = key;
        this.text = text;
    }

    setOnClick(fn: Function) {
        this.onClick = fn;
        return this;
    }

    setAutoToggleParentAfterClick(enabled: boolean = true) {
        this.autoToggleParent = enabled;
        return this;
    }
}