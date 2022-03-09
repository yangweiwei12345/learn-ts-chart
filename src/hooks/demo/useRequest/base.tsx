import React from 'react';
import { useRequest } from '../../src';

function getUsername(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(Math.random() > 0.5) {
        resolve('fuck name');
      } else {
        reject(new Error('Failed to get username'));
      }
    }, 1000);
  })
}

export default () => {
  const { data, error, loading, run } = useRequest(getUsername, {
    loadingDelay: 300,
    manual: true,
    onSuccess: (result, params) => {
      console.log(result, params, 'success')
    },
    onError: (error) => {
      console.log(error, 'error')
    },
  }, []);

  if(error) {
    return <div>{error.message}</div>;
  }

  if(loading) {
    return <div>loading...</div>
  }

  return <div>UserName: {data} <button onClick={run}>名称</button></div>
}