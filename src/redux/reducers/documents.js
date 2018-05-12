import {
    FETCH_DOCUMENTS,
    GET_CURRENT_DOCUMENT,
    CLEAR_CURRENT_DOCUMENT,
    ADD_DOCUMENT,
    EDIT_DOCUMENT,
    DELETE_DOCUMENT
} from '../constants/index'

import {removeItem, addItem, insertItem} from "../helpers"

const documents = (state = {
    items: []
}, action) => {
    switch (action.type) {

        case FETCH_DOCUMENTS:
            return Object.assign({}, state, {
                items: action.response
            });

        case ADD_DOCUMENT:
            return Object.assign({}, state, {
                items: addItem(state.items, action)
            })

        case DELETE_DOCUMENT:
            return Object.assign({}, state, {
                items: removeItem(state.items, action)
            })

        case EDIT_DOCUMENT:
            return Object.assign({}, state, {
                items: insertItem(state.items, action)
            })

        default:
            return state;
    }
}

export default documents