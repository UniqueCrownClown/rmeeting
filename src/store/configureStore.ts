
import rootReducer from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(thunkMiddleware))(createStore);
// 根上传递了一个空状态
export default function configureStore(initialState?: any) {
  const store = createStoreWithMiddleware(rootReducer, initialState)
  return store;
}
// const store = createStore(rootReducer, composeWithDevTools(
//   applyMiddleware(thunkMiddleware)
// ));
// export default function () {
//   return store
// }