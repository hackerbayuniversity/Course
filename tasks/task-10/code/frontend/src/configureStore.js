import { applyMiddleware, compose, createStore } from 'redux'
import ReduxPromise from 'redux-promise';

import rootReducer from './reducers';

export default function configureStore(preloadedState) {
  const middlewareEnhancer = applyMiddleware(ReduxPromise)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = compose(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  return store
}