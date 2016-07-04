export function add_list(name, uri) {
    return {
        type: 'ADD_LIST',
        name,
        uri
    }
}

export function update_list(name, uri) {
    return {
        type: 'UPDATE_LIST',
        name,
        uri
    }
}

export function delete_list(uri) {
    return {
        type: 'DELETE_LIST',
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

export function load_server(uri) {
    return {
        type: 'LOAD_SERVER',
        uri
    }
}

