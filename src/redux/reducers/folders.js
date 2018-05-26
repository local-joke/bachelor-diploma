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

import {removeItem, addItem, insertItem} from "../helpers"

const folders = (state = {
    currentFolder: null,
    isFetching: true,
    isAdding: false,
    isDeleting: false,
    editingFolder: null,
    items: []
}, action) => {
    switch (action.type) {

        case FETCH_FOLDERS:
            return Object.assign({}, state, {
                isFetching: true,
            });

        case FETCH_FOLDERS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.response
            });

        case SET_CURRENT_FOLDER:
            return Object.assign({}, state, {
                currentFolder: action.folder ? action.folder : null
            })

        case ADD_FOLDER:
            return Object.assign({}, state, {
                isAdding: true,
            })

        case ADD_FOLDER_SUCCESS:
            console.log('REDUCER ADD FOLDER', action.body)
            return Object.assign({}, state, {
                isAdding: false,
                items: addItem(state.items, action)
            })

        case DELETE_FOLDER:
            return Object.assign({}, state, {
                isDeleting: true,
            })

        case DELETE_FOLDER_SUCCESS:
            console.log('DELETE FOLDER', removeItem(state.items, action))
            return Object.assign({}, state, {
                items: removeItem(state.items, action)
            })

        case EDIT_FOLDER_SUCCESS:
            return Object.assign({}, state, {
                items: insertItem(state.items, action)
            })

        case CLEAR_CURRENT_FOLDER:
            return Object.assign({}, state, {
                currentFolder: null
            });

        case SET_EDITING_FOLDER:
            let folder = state.items.filter(item => {
                return item.id === action.id
            })
            return Object.assign({}, state, {
                editingFolder: folder[0]
            });

        case CLEAR_EDITING_FOLDER:
            return Object.assign({}, state, {
                editingFolder: null
            });

        default:
            return state;
    }
}

export default folders