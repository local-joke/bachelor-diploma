import {
    FETCH_FOLDERS,
    FETCH_FOLDERS_SUCCESS,
    SET_CURRENT_FOLDER,
    CLEAR_CURRENT_FOLDER,
    ADD_FOLDER,
    ADD_FOLDER_SUCCESS,
    EDIT_FOLDER,
    EDIT_FOLDER_SUCCESS,
    DELETE_FOLDER,
    DELETE_FOLDER_SUCCESS,
    FOLDERS_FAILURE,
    SET_EDITING_FOLDER,
    CLEAR_EDITING_FOLDER
} from '../constants/index'

export function getFolders(FOLDERs) {
    return {
        types: [FETCH_FOLDERS, FETCH_FOLDERS_SUCCESS, FOLDERS_FAILURE],
        endpoint: 'GetFoldersByUserId?userId=',
        response: FOLDERs
    }
}

export function setCurrentFolder(folder) {
    return {
        type: SET_CURRENT_FOLDER,
        folder
    }
}

export function clearCurrentFolder() {
    return {
        type: CLEAR_CURRENT_FOLDER
    }
}

export function addFolder(body) {
    return {
        types: [ADD_FOLDER, ADD_FOLDER_SUCCESS, FOLDERS_FAILURE],
        endpoint: 'PostFolder',
        response: body
    }
}

export function deleteFolder(id) {
    return {
        types: [DELETE_FOLDER, DELETE_FOLDER_SUCCESS, FOLDERS_FAILURE],
        endpoint: 'DeleteFolder?id=',
        response: id
    }
}

export function editFolder(body) {
    return {
        types: [EDIT_FOLDER, EDIT_FOLDER_SUCCESS, FOLDERS_FAILURE],
        endpoint: 'PutFolder?id=',
        response: body
    }
}

export function setEditingFolder(id) {
    return {
        type: SET_EDITING_FOLDER,
        id
    }
}

export function clearEditingFolder(id) {
    return {
        type: CLEAR_EDITING_FOLDER
    }
}