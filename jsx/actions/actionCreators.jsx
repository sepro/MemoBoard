import axios from 'axios';

export function add_list(data) {
    return {
        type: 'ADD_LIST',
        data
    }
}


export function update_list(list_index, name, collapsed) {
    return {
        type: 'UPDATE_LIST',
        list_index,
        name,
        collapsed
    }
}


export function delete_list(list_index) {
    return {
        type: 'DELETE_LIST',
        list_index
    }
}

export function add_item(list_index, data) {
    return {
        type: 'ADD_ITEM',
        list_index,
        data
    }
}

export function update_item(list_index, item_index, content) {
    return {
        type: 'UPDATE_ITEM',
        list_index,
        item_index,
        content
    }
}

export function delete_item(list_index, item_index) {
    return {
        type: 'DELETE_ITEM',
        list_index,
        item_index
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

export function delete_list_remote(list_index, uri) {
    return (dispatch) => {
        return axios.delete(uri).then((response) => {
                dispatch(delete_list(list_index));
            });
    }
}

export function update_list_remote(list_index, name, collapsed, uri) {
    return (dispatch) => {
        var params = new URLSearchParams();
        params.append('name', name);
        params.append('collapsed', collapsed ? 1 : 0);

        return axios.put(uri, params, {headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}})
            .then((response) => {
                dispatch(update_list(list_index, name, collapsed));
            })
    }
}

export function add_list_remote(name, uri) {
    return (dispatch) => {
        var params = new URLSearchParams();
        params.append('name', name);

        return axios.post(uri, params, {headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}})
            .then((response) => {
                dispatch(add_list(response.data));
            })

    }
}

export function delete_item_remote(list_index, item_index, uri) {
    return (dispatch) => {
        return axios.delete(uri).then((response) => {
                dispatch(delete_item(list_index, item_index));
            })
    }
}

export function update_item_remote(list_index, item_index, content, uri) {
    return (dispatch) => {
        var params = new URLSearchParams();
        params.append('content', content);

        return axios.put(uri, params, {headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}})
            .then((response) => {
                dispatch(update_item(list_index, item_index, content));
            })
    }
}

export function add_item_remote(list_index, content, uri) {
    return (dispatch) => {
        var params = new URLSearchParams();
        params.append('content', content);

        return axios.post(uri, params, {headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}})
            .then((response) => {
                dispatch(add_item(list_index, response.data));
            })

    }
}