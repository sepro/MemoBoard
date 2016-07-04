import { createStore } from 'redux';
import rootReducer from './reducers/index.jsx'

const defaultState = {lists: []};

const store = createStore(rootReducer, defaultState);

export default store;