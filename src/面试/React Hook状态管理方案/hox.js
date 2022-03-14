import React, { useEffect, useReducer, useRef } from "react";
import reconciler from 'react-reconciler';

const [, forceUpdate] = useReducer((c) => c + 1, 0);    // 更新

const createContainer = (hook) => {
  let store;

  const listeners = new Set();    // 定义回调集合

  const onUpdate = () => {
    for(const listener of listeners) {
      listener(store);
    }
  }

  // 传递hook和更新回调函数
  // render(<Exexutor hook={hook} onMount={val => store = val} onUpdate={onUpdate} />);


  function useContainer() {
    const storeRef = useRef(store);

    function listener(newStore) {
      // const newValue = newStore[dep];
      // const oldValue = storeRef.current[dep];

      // if(compare(newValue, oldValue)) {
      forceUpdate();
      // }
      storeRef.current = newStore;
    }

    useEffect(() => {
      listeners.add(listener);    // 初始化的时候添加回调，订阅更新

      return () => listeners.delete(listener);    // 组建销毁的时候删除
    }, [])

    return storeRef.current;
  }

  return useContainer;
}

function render(reactElement) {
  const container = reconciler.createContainer(null, 0, false, null);
  return reconciler.updateContainer(reactElement, container);
}

// react组件，感知 hook 内状态变更
const Exexutor = (props) => {
  const store = props.hook();
  const mountRef = useRef(false);

  // 状态初始化
  if(!mountRef.current) {
    props.onMount(store);
    mountRef.current = true;
  }

  // store 一旦变更，就会执行useEffect回调
  useEffect(() => {
    props.onUpdate(store)
  })

  return null;
}

export default {
  createContainer
}