import axios from 'axios';

export function add_list(name, uri) {
    return {
        type: 'ADD_LIST',
        name,
        uri
    }
}


export function update_list(list_index, name, uri) {
    return {
        type: 'UPDATE_LIST',
        list_index,
        name,
        uri
    }
}


export function delete_list(list_index, uri) {
    return {
        type: 'DELETE_LIST',
        list_index,
        uri
    }
}

export function add_item(content, uri) {
    return {
        type: 'ADD_ITEM',
        name,
        uri
    }
}

export function update_item(content, uri) {
    return {
        type: 'UPDATE_ITEM',
        name,
        uri
    }
}

export function delete_item(uri) {
    return {
        type: 'UPDATE_ITEM',
        uri
    }
}

export function load_data(data) {
    return {
        type: 'LOAD_DATA',
        data
    }
}

export function fetch_data(uri) {
    return (dispatch) => {

        return axios.get(uri).then((response) => {
            dispatch(load_data(response.data));
        });

    }

}
