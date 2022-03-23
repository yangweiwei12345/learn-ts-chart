/**
 * ####################### new 操作符实现过程 ####################### 
 * 1、创建一个空对象；
 * 2、将构造函数的作用域赋值给新对象
 * 3、构造函数中的this指向该对象
 * 4、返回新对象
 */
function news(func) {
  var target = {};    // 创建一个对象

  let constructor = Array.prototype.shift.call(arguments);

  if(typeof constructor !== 'function') {
    console.error('type error');
    return;
  }

  if(func.prototype !== null) {
    target.__proto__ = func.prototype;  // 将构造函数的作用域赋值给新对象（实例的__proto__指向原型）
  }
  let res = func.apply(target, Array.prototype.slice.call(arguments, 1));        // 构造函数中的this指向该对象（也就是为这个对象添加属性和方法)

  // 如果传入的函数（构造函数）有自己的返回值，则返回该值
  if((typeof res == 'object' || typeof res == 'function') && res !== null) {
    return res;
  }

  // 没有返回值，返回该对象
  return target;
}

/**
 * ################## es6 Proxy ########################
 */
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property);

      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value);
    }
  }

  return new Proxy(obj, handler);
}

let obj = { a: 1 };
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`);
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
  }
)
p.a = 12