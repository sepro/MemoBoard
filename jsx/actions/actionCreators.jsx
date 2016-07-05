import axios from 'axios';

export function add_list(data) {
    return {
        type: 'ADD_LIST',
        data
    }
}


export function update_list(list_index, name) {
    return {
        type: 'UPDATE_LIST',
        list_index,
        name
    }
}


export function delete_list(list_index) {
    return {
        type: 'DELETE_LIST',
        list_index
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
        type: 'DELETE_ITEM',
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
            console.log('Fetched data from server');
            dispatch(load_data(response.data));
        });
    }
}

export function delete_list_remote(list_index, uri) {
    return (dispatch) => {
        dispatch(delete_list(list_index));
        return axios.delete(uri).then((response) => {
            console.log('Removed list from server');
        });

    }
}

export function update_list_remote(list_index, name, uri) {
    return (dispatch) => {
        dispatch(update_list(list_index, name));

        var params = new URLSearchParams();
        params.append('name', name);

        return axios.put(uri, params, {headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}})
            .then((response) => {
                console.log('Updated list on server');
            })

    }
}

export function add_list_remote(name, uri) {
    return (dispatch) => {
        var params = new URLSearchParams();
        params.append('name', name);

        return axios.post(uri, params, {headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}})
            .then((response) => {
                console.log('New list on server');
                dispatch(add_list(response.data));
            })

    }
}

