import { createStore, applyMiddleware } from '../src';
import thunk from '../redux-thunk';
import logger from '../redux-logger';

function createReducer(store = 1, { type, payload = 1 }) {
  switch(type) {
    case 'ADD':
      return store + payload;
      break;
    case 'MINUS':
      return store - payload;
      break;
    default:
      return store;
      break;
  }
}

const store = createStore(createReducer, applyMiddleware(logger, thunk));

export default store;