/**
 * new 操作过程
 * 1. 创建一个新的空对象
 * 2. 将空对象的原型设置成构造函数的原型对象
 */
function news() {
  // 1. 创建一个新的空对象
  let target = {}, result = null;

  // 获取构造函数
  let constructor = Array.prototype.shift.call(arguments);

  if(typeof constructor !== "function") {
    console.log("constructor must be function");
    return;
  }

  // 2. 将空对象的原型设置成构造函数的原型对象
  target = Object.create(constructor.prototype);
  // 3. 让函数的this指向这个空对象，执行构造函数（借用构造函数继承）
  result = constructor.apply(target, Array.prototype.slice.call(arguments, 1));

  let flag = result && (typeof result === 'object' || typeof result === 'function');

  return flag ? result : target;
}