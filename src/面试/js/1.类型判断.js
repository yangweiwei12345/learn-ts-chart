/**
 * 7中基本类型（8种：bigInt 安全存储／操作大整数）
 * null undefined boolean string number symbol 复杂类型Object（引用类型：内置对象Date，函数function，数组Array）
 */

// 一、类型判断
/**
 * 1、typeof 基本数据除null外都返回对应类型的字符串
 * typeof 可以判断除null外的基本数据类型，可以判断函数类型
 */
 typeof 1 // "number" 
 typeof 'a'  // "string"
 typeof true      // "boolean"
 typeof undefined // "undefined"
 typeof Symbol()  // "symbol"  注意 typeof Symbol === 'function'
 typeof 42n       // "bigint"
 typeof NaN       // "number"

 /**
  * 2、Object.prototype.toString.call() 
  * 最完美的方法
  */
Object.prototype.toString.call(new Date)
Object.prototype.toString.call(Symbol())
Object.prototype.toString.call(function() {})

/**
 * 3、obj instanceof Object
 * 只能判断复杂数据类型，
 * 用于检测构造函数（右侧）的prototype属性是否出现在某个实例（左边）的原型链上
 */
[1, 2] instanceof Array
(new Date) instanceof Date

// 二、基本数据类型 Symbol
/**
 * 语法：
 * Symbol([description])
 * description: 对symbol的描述，可用于调试，不是访问Symbol本身
 */
var sym1 = Symbol();
var sym2 = Symbol('foo');
var sym3 = Symbol('foo');

sym2 == sym3  // false
sym2 === sym3  // false

console.log(sym1.description) // undefined
console.log(sym2.description) // foo

/**
 * 方法：
 * 1、Symbol.for(key)
 * 使用指定的key搜索现有的Symbol；【key表示symbol中的description】
 * 返回值：如果找到，则返回symbol。否则创建一个新的symbol，key作为desciption,添加到注册表中；
 * 
 * 2、Symbol.keyFor(sym)
 * 从symbol注册表中，返回指定symbol的description，没有返回undefined
 * 
 * 注意：
 * 1、如果使用Symbol()定义的symbol，则不会添加到注册表中，使用Symbol.for()定义的symbol则会添加到注册表
 * 2、Symbol.for(key)和Symbol.keyFor(sym) 都是在symbol注册表中进行查找，不会找到Symbol()定义的symbol
 */
var sym4 = Symbol();
var sym5 = Symbol('sym');
var sym6 = Symbol('sym');

var sym7 = Symbol.for('sym');
var sym8 = Symbol.for('sym');

console.log(sym7 === sym8)  // true
console.log(Symbol.keyFor(sym5)) // undefined
console.log(Symbol.keyFor(sym7)) // sym

/**
 * 操作：
 * Symbol作为对象的属性，进行遍历
 * 注意：
    1、对象的属性要使用变量值，必须使用[变量名]
    2、Symbol类型作为对象的私有属性，通过for/in、for/of无法遍历，必须使用Object.getOwnPropertySymbols(对象)或Reflect.ownKeys(对象)进行遍历
 */
let symbol = Symbol("sym");
let obj = {
  name: "symbol_name",
  [symbol]: "唯一性"
};

// 访问对象的基本属性
for (const key in obj) {
  console.log(key); //name
}
for (const key of Object.keys(obj)) {
  console.log(key); //name
}

// 访问对象中的私有属性
for (const key of Object.getOwnPropertySymbols(obj)) {
  console.log(key); // Symbol(sym)
}

for (const key of Reflect.ownKeys(obj)) {
// 访问对象的所有属性
  console.log(key); // name 、Symbol(sym)
}