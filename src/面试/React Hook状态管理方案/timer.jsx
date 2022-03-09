import React, { createContext, useContext, useState } from 'react';
import ReactDOM from 'react-dom';
// react createContext useContext 直接使用
import { StoreContext } from './context';
import { useCount } from './hooks';
import UnstateNext from './unstate-next';
import Hox from './hox';

const ReactContextTimer = (props) => {
  const store = useContext(StoreContext);

  return (
    <>
      <button onClick={store.decrement}>-</button>
      <span>{store.count}</span>
      <button onClick={store.increment}>+</button>
    </>
  )
}

const Store = UnstateNext.createContainer(useCount);
const UnstateNextTimer = () => {
  const store = Store.useContainer();

  return (
    <>
      <button onClick={store.decrement}>-</button>
      <span>{store.count}</span>
      <button onClick={store.increment}>+</button>
    </>
  )
}

// Hox
const useHoxContainer = Hox.useContainer(useCount);
const HoxTimer = () => {
  const store = useHoxContainer();

  return (
    <>
      <button onClick={store.decrement}>-</button>
      <span>{store.count}</span>
      <button onClick={store.increment}>+</button>
    </>
  )
}

const App = () => {
  let type = 'react_usecontext';
  const store = useCount();

  return (
    <>
      <h2>直接使用React Context</h2>
      <StoreContext.Provider value={store}><ReactContextTimer /></StoreContext.Provider>
      <h2>unstate-next：封装ReactContext，使用方便</h2>
      <Store.Provider value={store}><UnstateNextTimer /></Store.Provider>
      <h2>hox：</h2>
      <HoxTimer />
    </>
  )
  
}

ReactDOM.render(<App />, document.getElementById('app'))
