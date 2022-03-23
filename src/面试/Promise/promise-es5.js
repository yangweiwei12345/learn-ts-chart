
/**
 * 自定义Promise函数模块
 */
(function(win) {
  const PENDDING = 'pendding';
  const RESOLVED = 'resolved';
  const REJECTED = 'rejected';

  /**
   * Promise构造函数
   * @param {function} excutor 执行器函数（同步执行）
   */
  function Promise(excutor) {
    this.status = PENDDING;   // 给promise指定status属性，初始值为pendding
    this.data = undefined;      // 给promise对象指定一个用于存储结果数据的属性
    this.callbacks = [];        // 每个元素的结构： { onResolved, onRejected }
    const self = this;

    function resolve(value) {
      if(self.status !== PENDDING) {
        return;
      }

      // 将状态改为resolved
      self.status = RESOLVED;
      // 保存value数据
      self.data = value;
      // 如果有待执行callback函数，立即异步执行回调函数onResolved
      if(self.callbacks.length > 0) {
        self.callbacks.forEach(callbackObj => {
          setTimeout(() => {  // 放入队列中执行所有成功的回调
            callbackObj.onResolved()
          })
        });
      }
    }

    function reject(reason) {
      if(self.status !== PENDDING) {
        return;
      }

      // 将状态改为rejected
      self.status = REJECTED;
      // 保存value数据
      self.data = reason;
      // 如果有待执行callback函数，立即异步执行回调函数onRejected
      if(self.callbacks.length > 0) {
        self.callbacks.forEach(callbackObj => {
          setTimeout(() => {  // 放入队列中执行所有成功的回调
            callbackObj.onRejected()
          })
        });
      }
    }

    // 同步执行执行器函数
    try { // 如果执行器抛出异常，promise对象变为rejected状态
      excutor(resolve, reject);
    } catch(error) {
      reject(error)
    }
  }

  /**
   * Promise原型对象方法 then
   * 指定成功／失败的回调函数
   * @param {function} onResolved 
   * @param {function} onRejected 
   * @return 返回一个新的promise对象
   */
  Promise.prototype.then = function(onResolved, onRejected) {
    let self = this;

    onResolved = typeof onResolved === 'function' ? onResolved : value => value;
    // 指定默认失败的回调（实现错误／异常传透的关键）
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    // 返回一个promise
    return new Promise((resolve, reject) => {

      function handle(callback) {
        /**
         * 1、如果抛出异常，return的promise就会失败，reason就是error
         * 2、如果回调函数返回不是promise，return的promise就会成功，value就是返回值
         * 3、如果回调函数返回是promise，return的promise的结果就是这个promise的结果
         */
        try {
          const result = callback(self.data);
          // 3、如果返回结果是一个promise，return的promise的结果就是这个promise的结果
          if(result instanceof Promise) {
            result.then(resolve, reject)
            // result.then(
            //   value => resolve(value),    // 当result成功时，让return的promise也成功
            //   reason => reject(reason)    // 当result失败时，让return的promise也失败
            // )
          } else {  // 2、如果返回不是一个promise，return的promise就会成功，value就是返回值
            resolve(result);
          }
        } catch(error) {  // 1、抛出异常，返回的promise改为错误状态
          reject(error);
        }
      }

      // 当前状态为pendding， 保存成功失败回调函数
      if(this.status === PENDDING) {
        this.callbacks.push({
          onResolved() {
            handle(onResolved)
          },
          onRejected() {
            handle(onRejected)
          }
        })
      } else if(this.status === RESOLVED) {
       
        setTimeout(() => {
          handle(onResolved)
        })
      } else {
         setTimeout(() => {
          handle(onRejected)
        })
      }
    })
    
  }

  /**
   * Promise原型对象方法 catch
   * 指定失败的回调函数
   * @param {function} onRejected 
   * @return 返回一个新的promise
   */
  Promise.prototype.catch = function(onRejected) {
    return this.then(undefined, onRejected);
  }

  /**
   * Promise原型对象的方法 finally
   * @param {*} callback 
   * @returns 
   */
  Promise.prototype.finally = function(callback) {
    return this.then(
      value  => MyPromise.resolve(callback()).then(() => value),
      reason => MyPromise.resolve(callback()).then(() => { throw reason })
    );
  }

  /**
   * Promise函数对象方法 resolve
   * @param {*} value 
   * @return 返回一个指定value的resoved状态的promise
   */
  Promise.resolve = function(value) {
    // 返回一个成功／失败的promise
    return new Promise((resolve, reject) => {
      // value 是promise
      if(value instanceof Promise) {  // 如果value的结果是promise
        value.then(resolve, reject);
      } else {  // value不是promise =》 promise变为成功，数据是value
        resolve(value);
      }
    })
  }

  /**
   * Promise函数对象方法 reject
   * @param {*} reason 
   * @return 返回一个指定reason的rejected状态的promise
   */
  Promise.reject = function(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    })
  }

  /**
   * Promise函数对象方法 all
   * @param {array} promises 
   * @return 返回一个promise，只有当所有promises都成功时才成功
   */
  Promise.all = function(promises) {
    const values = new Array(promises.length);
    let resolvedCount = 0;

    return new Promise((resolve, reject) => {
      promises.forEach((p, index) => {
        // promises中有可能不是promise对象，所以用Promise.resolve包装一下
        Promise.resolve(p).then(
          value => {
            resolvedCount++;
            values[index] = value;

            // 如果全部成功了
            if(resolvedCount === promises.length) {
              resolve(values);
            }
          },
          reason => {
            reject(reason);
          }
        )
      })
    })
  }

  /**
   * Promise函数对象方法 race
   * @param {array} promises 
   * @return 返回一个promise，结果由第一个完成的promise决定
   */
  Promise.race = function(promises) {

    return new Promise((resolve, reject) => {
      promises.forEach(p => {
        Promise.resolve(p).then(
          value => {
            resolve(value);
          },
          reason => {
            reject(reason);
          }
        )
      })
    })
  }

  /**
   * 指定时间确定结果
   * @param {*} value 
   * @param {*} time 
   */
  Promise.resolvDelay = function(value, time) {
    // 返回一个成功／失败的promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // value 是promise
        if(value instanceof Promise) {  // 如果value的结果是promise
          value.then(resolve, reject);
        } else {  // value不是promise =》 promise变为成功，数据是value
          resolve(value);
        }
      }, time);
    })
  }

  Promise.rejectDelay = function(reason, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(reason);
      }, time);
    })
  }

  // 向外暴露Promise
  win.Promise = Promise
})(window)
