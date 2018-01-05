
export const partial = (fn, ...args) => fn.bind(null, ...args)
// first ...args is for rest operator (...)
// second ...args is spread operator (...)

const _pipe = (f, g) => (...args) => g(f(...args))

export const pipe = (...fns) => fns.reduce(_pipe)


