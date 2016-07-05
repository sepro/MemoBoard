import { createStore } from 'redux';
import rootReducer from './reducers/index.jsx'

import lists from './data/lists.jsx'

const defaultState = {lists};

const store = createStore(rootReducer, defaultState);

export default store;