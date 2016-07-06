import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store.jsx';

import App from './app.jsx';


ReactDOM.render(
  <Provider store={store}>
    <App url={document.getElementById('memoboard').getAttribute('url')} />
  </Provider>,
  document.getElementById('memoboard')
);
