import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from "../reducers/index";

export default configStore = (preloadedState) => {
  const middlewares = [thunk]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = compose(...enhancers)
  const persistConfig = {
    key: 'root',
    storage
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(persistedReducer, preloadedState, composedEnhancers)
  const persistor = persistStore(store)

  return {store, persistor}
}
