### TypeScript

#### 1、类型
基础类型：boolean、string、number、null、undefined、symbol  
ts新增的  any  never
引用类型：object

对象 interface
数组 number[]  string[]  boolean[]  泛型写法：Array<number>

函数：

新的语法特性：
as 断言
class (OOP 面向对象的三大特性)：封装、继承、多态

### 1.2 null、undefined(所有类型的子类型)


### 1.3 never

```js
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

### 1.4 接口 interface
- 对值所具有的结构进行描述
- 对类的一部分行为的抽象
