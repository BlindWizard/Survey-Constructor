class BEM {
    constructor(block, element, modifiers = [], nonBemClasses = []) {
        this.block = block;
        this.element = element;
        this.modifiers = modifiers;
        this.nonBemClasses = nonBemClasses;
    }

    el(elementIdentifier) {
        let newBlock = this.clone();
        if (typeof elementIdentifier !== 'undefined'
            && elementIdentifier.toString().length) {
            newBlock.element = elementIdentifier;
        }

        return newBlock;
    }

    is(modifier, isOn = true) {
        let modifiers = this.modifiers.slice();
        isOn && typeof modifier !== 'undefined'
        && modifier.toString().length
        && modifiers.push(modifier);

        return this.clone({
            modifiers: modifiers,
            nonBemClasses: this.nonBemClasses
        });
    }

    add(className) {
        let nonBemClasses = this.nonBemClasses.slice();
        if (typeof className !== 'undefined'
            && className.toString().length) {
            nonBemClasses.push(className);
        }

        return this.clone({
            nonBemClasses: nonBemClasses,
            modifiers: this.modifiers
        });
    }

    toString() {
        let prefix = typeof this.element !== 'undefined' ? bemGetElement(this.block, this.element) : this.block;
        const classes = [prefix];
        for (let modifier of this.modifiers) {
            classes.push(bemGetMod(prefix, modifier));
        }
        for (let extraClass of this.nonBemClasses) {
            classes.push(extraClass);
        }

        return classes.join(' ');
    }

    clone(newBlock = {}) {
        return new BEM(this.block, this.element, newBlock.modifiers, newBlock.nonBemClasses)
    }
}

export const bem = function(ctx) {
    if (typeof ctx === 'object') {
        if (ctx instanceof BEM) {
            return ctx;
        }

        return new BEM(ctx.constructor.name);
    }
    else if (typeof ctx === 'string') {
        return new BEM(ctx);
    }

    throw "BEM block not of valid type";
};

export const bemGetElement = function(block, element) {
    return block + '__' + element;
};

export const bemGetMod = function(block, mod) {
    return block + '_' + mod;
};

export const bemGetElementMod = function(block, element, mod) {
    return bemGetMod(bemGetElement(block, element), mod);
};