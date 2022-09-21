export interface ValueObject<T> {
    value: T;
}

class UserName {
    public readonly value: string;

    constructor(value: string) {
        if (value === '') {
            throw new Error('Empty value');
        }
        this.value = value;
    }
}