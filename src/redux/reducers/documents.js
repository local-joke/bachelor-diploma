import {
    FETCH_DOCUMENTS,
    FETCH_DOCUMENTS_SUCCESS,
    ADD_DOCUMENT,
    ADD_DOCUMENT_SUCCESS,
    DELETE_DOCUMENT,
    DELETE_DOCUMENT_SUCCESS,
    DOCUMENT_FAILURE,
    EDIT_DOCUMENT,
    EDIT_DOCUMENT_SUCCESS,
} from '../constants/index'

import {removeItem, addItem, insertItem} from "../helpers"

const documents = (state = {
    isFetching: true,
    isAdding: false,
    isDeleting: false,
    items: []
}, action) => {
    switch (action.type) {

        case FETCH_DOCUMENTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.response
            });

        case ADD_DOCUMENT:
            return Object.assign({}, state, {
                isAdding: true,
            })

        case ADD_DOCUMENT_SUCCESS:
            return Object.assign({}, state, {
                isAdding: false,
                items: addItem(state.items, action)
            })

        case DELETE_DOCUMENT:
            return Object.assign({}, state, {
                isDeleting: true,
            })

        case EDIT_DOCUMENT_SUCCESS:
            return Object.assign({}, state, {
                items: insertItem(state.items, action)
            })

        case DELETE_DOCUMENT_SUCCESS:
            return Object.assign({}, state, {
                isDeleting: false,
                items: removeItem(state.items, action)
            })

        default:
            return state;
    }
}

export default documents