import {applyMiddleware, compose, createStore} from 'redux';
import reducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
  ));
  sagaMiddleware.run(rootSaga);
  return store;
}


// import { createStore, applyMiddleware } from 'redux'
// import rootReducer from '../reducers'
// import createSagaMiddleware from 'redux-saga'

// export default function configureStore() {
//   const sagaMiddleware = createSagaMiddleware()
//   return {
//     ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
//     runSaga: sagaMiddleware.run,
//   }
// }