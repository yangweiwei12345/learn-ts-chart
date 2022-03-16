import React, { useEffect } from 'react';
import store from './store';
import { useUpdate } from '../../../hooks/src'

const ReduxPage = () => {

  const refresh = useUpdate();

  useEffect(() => {
    store.subscribe(() => {
      refresh();
    })
  }, [])

  return (
    <div>
      <h3>ReduxPage</h3>
      <div>
        获取store里面设置的state
        <p>{store.getState()}</p>
      </div>
      点击触发dispatch
      <button onClick={() => store.dispatch({ type: 'ADD' })}>增加</button>
      <button onClick={() => {
        debugger;
        store.dispatch((dispatch, getState) => {
          setTimeout(() => {
            dispatch({ type: 'ADD' })
            console.log(getState(), 'getState');
          }, 1000)
        })
      }}>异步增加</button>
    </div>
  )
}

export default ReduxPage;