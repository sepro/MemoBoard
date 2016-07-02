import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Memoboard from './components/memoboard.jsx';

function reducer(state = [], action) {
    return state;
}

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
  <Memoboard url={document.getElementById('memoboard').getAttribute('url')} />
  </Provider>,
  document.getElementById('memoboard')
);