export type Left<L> = { readonly _tag: "Left"; readonly left: L };
export type Right<R> = { readonly _tag: "Right"; readonly right: R };

export type Either<L, R> = Left<L> | Right<R>;
