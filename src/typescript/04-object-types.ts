export {};

// object 并不单指对象，它代表除了原始类型外的所有类型
const foo: object = function() {} || [] || {}


const obj: { foo: number, bar: string } = { foo: 123, bar: '123' }