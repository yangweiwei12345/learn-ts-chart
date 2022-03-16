## Promise 

### 1、课外知识
> 函数对象和实力对象


### 2、常见的内置错误


### 3、Promise是什么
1、抽象表达
Promise是js中进行异步编程的新的解决方案

2、具体表单
(1) 从语法上来说Promise是一个构造函数；
(2) 从功能上来说Promise对象用来封装一个异步操作并可以获取其结果；


### 4、promise状态改变
1、promise共有三种状态，pending、resolved、rejected；
2、promise状态只能改变一次；
3、成功和失败都会有结果数据，成功的结果value，失败结果reason；


### 5、为什么使用promise
1、指定回调函数更灵活：
  回调函数：必须在异步任务前指定回调函数，不然无法回调；
  promise：启动异步任务 => 返回promise对象 => 给promise对象绑定回调函数（可以在异步函数结束之后指定回调）

```js
// 成功回调函数
function successCallback(result) {
  console.log(result);
}

// 失败的回调函数
function failureCallback(error) {
  console.log(error);
}

/* 1.1 使用纯回调函数 */
createAudioFileAsync(audioSetting, successCallback, failureCallback);

/* 1.2 使用Promise */
const promise = createAudioFileAsync(audioSetting);
// 可以在异步任务结束后指定回调函数
setTimeout(() => {
  promise.then(successCallback, failureCallback);
}, 3000);
```

2、支持链式调用，解决回调低于问题，不便于阅读和异常处理

```js
/*
 * 2.1 回调地狱
 * 多个串联的异步函数，依赖上个请求的结果，每个函数都要处理他的异步情况
 */
doSomeing(function(result) {
  doSomethingElse(result, function(newResult) {
    ...
  })
})

/*
 * 2.2 使用Promise链式调用解决回调函数
 * 代码编写从上至下，便于阅读，统一处理异步错误catch(异常传透)
 */
doSomething()
  .then(function(result) {
    return dosomethingElse(result);
  })
  .then(function(newResult) {
    return doThirdThing(newResult);
  })
  .catch(failureCallback)

/*
 * 2.3 async/await: 回调函数终极解决方案，没有回调函数
 */
async function request() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
  } catch(failureCallback)
}
```

### 6、Promise API说明
**1、Promise构造函数： Promise(excutor) {}**
- excutor函数：同步执行 (resolve, reject) => {}
- resolve函数：内部定义成功时我们调用的函数 value => {}
- reject函数： 内部定义失败时我们调用的函数 reason => {}
- 说明：excutor 会在Promise内部立即同步调用，异步操作在执行器中执行

**2、Promise.prototype.then 方法：(onResolved, onRejected) => {}**
- onResolved函数： 成功的回调函数 (value) => {}
- onRejected函数： 失败的回调函数 (reason) => {}
- 说明：指定用于得到成功value的成功回调和用于得到失败reason的失败回调函数，返回一份promise对象

**3、Promise.prototype.catch方法：(onRejected) => {}**
- onRejected函数：失败的回调函数 (reason) => {}
- 说明：then()的语法糖，相当于：then(undefined, onRejected);

**4、Promise.resolve方法： (value) => {}**
- value: 成功的数据或promise对象
- 说明： 返回一个成功／失败的promise对象

**5、Promise.reject方法：(reason) => {}**
- reason: 失败原因
- 说明：返回一个失败的promise对象

### 7、promise一些重要问题
**1、如何改变promise的状态？**
- resolve(value): pendding状态改为resolved状态
- reject(reason): pendding状态变为rejected
- 抛出异常：如果当前是pendding变为rejected

**2、 一个promise指定多个成功／失败回调函数，都会执行**

**3、 是先改变状态还是指定回调函数**
- (1) 都有可能，正常情况下是先指定回调函数在改变状态，但是也可以先改变状态在指定回调函数
- (2) 如何先改状态值回调
  - 在执行器中直接调用resolve()/reject()
  - 延迟更长时间才调用then()
```js
  // 常规：先指定回调函数，在改变状态
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000)
  }).then(  // 先指定回调函数，保存当前指定的回调函数
    value => {},
    reason => {}
  )

  // 先改变状态，后指定回调函数
  new Promise((resolve, reject) => {
    resolve(1);   // 当同步调用时，先改变状态，在执行回调函数
  }).then(    // 后指定回调函数，异步执行回调函数
    value => {},
    reason => {}
  )
```

**4、Promise.then的值由什么决定**
(1)、简单表达：由then()指定的回调函数执行的结果决定
(2)、详细表答：
  - 如果抛出异常，新的promise变为rejected，reason为抛出的异常；
  - 如果返回的是非promise的任意值，新promise变为resolved，value为返回的值
  - 如果返回一个新promise，此promise的结果就会成为新promise的结果

```js
new Promise((resolve, reject) => {
  resolve(1)
}).then(
  value => {
    /**
      * 1、console.log("onResolved()1", value)
      *    会执行下面then的onResolved()函数，value值为undefined
      * 
      * 2、return 2
      *    会执行下面then的onResolved()函数，value值为2
      * 
      * 3、return Promise.resolve(3)
      *    会执行下面then的onResolved()函数，value值为3
      * 
      * 4、return Promise.reject(4)
      *    会执行下面then的onRejected()函数，reason值为4
      * 
      * 5、throw 5
      *    会执行下面then的onRejected()函数，reason值为5
    */
    
  },
  reason => {
    console.log("onRejected()1", reason)
  }
).then(
  value => {
    console.log("onResolved()2", value)
  },
  reason => {
    console.log("onRejected()2", reason)
  }
)
```

**5、promise异常传透**
1、当使用promise的then链式调用时，可以在最后指定失败的回调；
2、前面任何操作出了异常，都会传到最后失败的回调中处理；

**6、中断promise链**
1、使用promise的then链式调用时，在中间中断，不再调用后面的回调函数；
2、在回调函数中返回一个pedding状态的promise；
