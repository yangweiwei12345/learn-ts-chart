/**
 * 手写 Object.create
 * 创建一个新对象，使用现有的对象来提供新创建对象的__proto__
 * 
 * let e = Object.create({})
 * e.__proto__ === {}
 */
function create(proto, propertiesObject) {
  // proto 不是object或function
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object: ' + proto);
  } else if (proto === null) {  // 第一个参数不能为null，实际Object.create()第一个参数可以为null
    throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
  }

  if (typeof propertiesObject !== 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");

  function F() {}
  F.prototype = proto;

  // new F()实例的__proto__指向 F.prototype，然后prototype指向 proto
  return new F();
}