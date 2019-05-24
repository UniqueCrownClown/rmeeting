
import rootReducer from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';


const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
// 根上传递了一个空状态
export default function configureStore(initialState?: any) {
  const store = createStoreWithMiddleware(rootReducer, initialState)
  return store;
}
// const store = createStore(rootReducer);
// export default function () {
//   return store
// }