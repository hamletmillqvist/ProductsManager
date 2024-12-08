interface Array<T> {
    any(propertyAccessor: (array: T) => boolean): boolean;
}

Array.prototype.any = function(propertyAccessor: (array: any) => boolean): boolean {
    for (const item of this) {
        if (propertyAccessor((item))) {
            return true;
        }
    }

    return false;
}