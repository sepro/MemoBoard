import axios from 'axios';

function lists(state = [], action) {
    if (action.type === 'LOAD_SERVER') {
        return ['test'];
    } else {
        console.log(state, action);
        return state;
    }
}

export default lists;