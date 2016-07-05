
function lists(state = [], action) {
    switch(action.type) {
        case 'DELETE_LIST' :
            var i = action.list_index;
            return [
                ...state.slice(0,i),
                ...state.slice(i + 1),
            ]

        case 'UPDATE_LIST' :
            var i = action.list_index;

            return [
                ...state.slice(0,i),
                { ...state[i], name: action.name },
                ...state.slice(i+1)
            ]

        case 'ADD_LIST' :
            return [...state, action.data];

        case 'LOAD_DATA' :
            return action.data;

        default:
            return state;
    }
}

export default lists;