type BaseItemType = readonly string[];
type TypeParameter2string<T> = T extends string ? T : never;

type Original<T extends BaseItemType, P extends string> = {
    readonly [I in T[number]]: `${P}:${I}`;
};

type Children<T extends Record<string, BaseItemType>, P extends string> = {
    readonly [I in keyof T]: Original<T[I], `${P}:${TypeParameter2string<I>}`>;
};

type GeneratorPrefix = string;
type GeneratorOriginal = BaseItemType;
type GeneratorChildren = Record<string, BaseItemType>;

const buildOriginal = <P extends GeneratorPrefix, T extends GeneratorOriginal>(prefix: P, original: T): Original<T, P> => original
        .reduce((result, item) => ({ ...result, [item]: `${prefix}:${item}` }), {} as Original<T, P>);

function buildChildren<P extends GeneratorPrefix, T extends GeneratorChildren>(prefix: P, children?: T): Children<T, P> {
    if (!children) {
        return {} as Children<T, P>;
    }
    
    let result = {} as  Required<Children<T, P>>;
    for (let key in children) {
        result[key] = buildOriginal(`${prefix}:${key}`, children[key]);
    }

    return result;
}

export const generator = <P extends GeneratorPrefix, O extends GeneratorOriginal, C extends GeneratorChildren>(prefix: P, original: O, children?: C): Original<O, P> & Children<C, P> => 
    ({ ...buildOriginal(prefix, original), ...buildChildren(prefix, children) });
