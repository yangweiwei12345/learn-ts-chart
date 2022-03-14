// middleware 中间件
export default function applyMiddleware(...middleware) {

  console.log(middleware, '插件数组');

  return createStore => reducer => {

    // 获取store
    let store = createStore(reducer);
    // 获取当前dispatch
    let dispatch = store.dispatch;

    // 加强dispatch
    // 定义插件需要用到的参数
    const middleApi = {
      getState: store.getState,
      dispatch: (actions, ...args) => dispatch(actions, ...args)
    };

    /**
     * middlewareChain []
     * [
     *  // thunk
     *  next => action=>{
          // 第二种情况：是个回调函数
          console.log(next,'next') // 前面聚合的函数，compose()的聚合出来的结果, 目前测试就一个回调，可以理解为dispatch
          console.log(action, 'action')
          if(typeof action === 'function'){
              return action(dispatch, getState)
          }

          //  第一种情况：如果传进来的是一个对象，那么就直接执行
          return next(action)
        },
        // logger
        next => action => {}
     * ]
     */
    const middlewareChain = middleware.map(mids => mids(middleApi));
    console.log(middlewareChain, 'middlewareChain')

    dispatch = compose(...middlewareChain)(store.dispatch);
    console.log(dispatch, 'compose dispatch')

    return {
      ...store,
      dispatch
    }
  }
}

function compose(...funcs) {
  if(!funcs.length) {
    return args => args;
  }

  if(funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => {
    console.log(a, '====== a =======');
    console.log(b, '====== b =======');

    // args 参数是传入的dispatch
    return (...args) => { console.log(args, 'reduce args'); return a(b(...args)) }
  });
}