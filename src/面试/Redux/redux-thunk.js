// redux-thunk源码
export default function thunk({dispatch, getState}){
  //thunk 里面首先执行的可能是一个dipatch，也有可能是一个function，所以在不确定的情况下，我们将它定义为next
  return next => action=>{
    // 第二种情况：是个回调函数
    console.log(next,'next') // 前面聚合的函数，compose()的聚合出来的结果, 目前测试就一个回调，可以理解为dispatch
    console.log(action, 'action')
    if(typeof action === 'function'){
        return action(dispatch, getState)
    }

    //  第一种情况：如果传进来的是一个对象，那么就直接执行
    return next(action)
  }
}
