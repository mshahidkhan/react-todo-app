
export const partial = (fn, ...args) => fn.bind(null, ...args)
// first ...args is for the array of arguments
// second ...args is spread operator