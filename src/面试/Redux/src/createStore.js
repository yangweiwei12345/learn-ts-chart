export default function createStore(reducer, enhancer) {
  // 加强dispatch
  if(enhancer) {
    
    return enhancer(createStore)(reducer);  // 返回加强版的store
  }

  // 内部定义state初始值
  let currentState;
  // 所有的监听记录下来做一个数组
  let currentListeners = [];

  // 返回当前的state
  function getState() {
    return currentState;
  }

  // 接受一个action，改变state
  function dispatch(action) {
    currentState = reducer(currentState, action);

    currentListeners.forEach(listener => listener());
  }

  function subscribe(listener) {
    currentListeners.push(listener);
  }

  // 初始化
  dispatch({ type: Math.random() })

  return {
    getState,
    dispatch,
    subscribe
  }
}