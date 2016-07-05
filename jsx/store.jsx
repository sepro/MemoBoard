import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index.jsx'

import lists from './data/lists.jsx'

const defaultState = {lists};

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk));

export default store;