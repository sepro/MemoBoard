function lists(state = [], action) {
    switch(action.type) {
        case 'DELETE_LIST' :
            console.log(state, action);
            var i = action.list_index;
            return [
                ...state.slice(0,i),
                ...state.slice(i + 1),
            ]

        case 'UPDATE_LIST' :
            console.log(state, action);
            var i = action.list_index;
            var output = Object.assign([], state);
            output[i].name = action.name;
            return output;

        case 'ADD_LIST' :
            console.log(state, action);
            var new_list = {
                id: 20,
                name: action.name,
                items: [],
                uri: ''
            }
            return [...state, new_list];

        default:
            return state;
    }
}

export default lists;