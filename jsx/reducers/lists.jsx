
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

        case 'DELETE_ITEM' :
            var i = action.list_index;
            var j = action.item_index;
            return [
                ...state.slice(0,i),
                { ...state[i], items: [...state[i].items.slice(0,j), ...state[i].items.slice(j+1)] },
                ...state.slice(i+1)
            ]

        case 'UPDATE_ITEM' :
            var i = action.list_index;
            var j = action.item_index;
            return [
                ...state.slice(0,i),
                { ...state[i], items: [...state[i].items.slice(0,j), {...state[i].items[j], content: action.content},  ...state[i].items.slice(j+1)] },
                ...state.slice(i+1)
            ]

        case 'ADD_ITEM' :
            var i = action.list_index;
            console.log(action.data);
            return [
                ...state.slice(0,i),
                { ...state[i], items: [...state[i].items, action.data] },
                ...state.slice(i+1)
            ]

        case 'LOAD_DATA' :
            return action.data;

        default:
            return state;
    }
}

export default lists;