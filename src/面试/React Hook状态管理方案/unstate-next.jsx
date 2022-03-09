import React,{ createContext, useContext } from 'react';

/**
 * 将Context的定义和引用抽象出来
 */
const createContainer = (useHook) => {
  // 定义context
  const StoreContext = createContext();

  function useContainer() {
    // 
    const store = useContext(StoreContext);
    return store;
  }

  function Provider(props) {
    const store = useHook();

    return <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>
  }

  return { Provider, useContainer };
}

export default {
  createContainer
}