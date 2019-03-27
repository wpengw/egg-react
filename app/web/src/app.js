import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './route';
import configureStore from './store/configureStore'
// import rootSaga from './store/sagas'

const store = configureStore()
// store.runSaga(rootSaga)

if (EASY_ENV_IS_DEV) {
  module.hot.accept();
}
ReactDOM.render(
  <div>
    <Provider store={store}>
      <App url = { store.getState().url } />
    </Provider>
  </div>,
  document.getElementById('app')
);
