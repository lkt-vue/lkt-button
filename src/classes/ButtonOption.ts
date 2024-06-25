export class ButtonOption {
    key: string = '';
    text: string = '';

    onClick: Function|undefined = undefined;
    classes: string = '';
    containerClasses: string = '';
    classGenerator: Function|undefined = undefined;

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

    setClassGenerator(fn: Function) {
        this.classGenerator = fn;
        return this;
    }

    setClasses(classes: string) {
        this.classes = classes;
        return this;
    }

    setContainerClasses(classes: string) {
        this.containerClasses = classes;
        return this;
    }
}