import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store.jsx'

import Memoboard from './components/memoboard.jsx';


ReactDOM.render(
  <Provider store={store}>
  <Memoboard url={document.getElementById('memoboard').getAttribute('url')} />
  </Provider>,
  document.getElementById('memoboard')
);