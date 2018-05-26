import {
    FETCH_NOTES,
    FETCH_NOTES_SUCCESS,
    GET_CURRENT_NOTE,
    CLEAR_CURRENT_NOTE,
    ADD_NOTE,
    ADD_NOTE_SUCCESS,
    EDIT_NOTE,
    EDIT_NOTE_SUCCESS,
    DELETE_NOTE,
    DELETE_NOTE_SUCCESS,
    NOTES_FAILURE,
} from '../constants/index'

import {removeItem, addItem, insertItem} from "../helpers"

const notes = (state = {
    currentNote: null,
    isFetching: true,
    isAdding: false,
    isDeleting: false,
    items: []
}, action) => {
    switch (action.type) {

        case FETCH_NOTES:
            return Object.assign({}, state, {
                isFetching: true,
            });

        case FETCH_NOTES_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.response
            });

        case GET_CURRENT_NOTE:
            let note
            state.items.forEach((item) => {
                if (item.id === action.id) {
                    note = item
                }
            })
            console.log('REDUCER note', note)
            return Object.assign({}, state, {
                currentNote: note
            });

        case ADD_NOTE:
            return Object.assign({}, state, {
                isAdding: true,
            })

        case ADD_NOTE_SUCCESS:
            return Object.assign({}, state, {
                isAdding: false,
                items: addItem(state.items, action)
            })

        case DELETE_NOTE:
            return Object.assign({}, state, {
                isDeleting: true,
            })

        case DELETE_NOTE_SUCCESS:
            console.log('DELETE NOTE',removeItem(state.items, action))
            return Object.assign({}, state, {
                items: removeItem(state.items, action)
            })

        case EDIT_NOTE_SUCCESS:
            return Object.assign({}, state, {
                items: insertItem(state.items, action)
            })

        case CLEAR_CURRENT_NOTE:
            return Object.assign({}, state, {
                currentNote: null
            });

        default:
            return state;
    }
}

export default notes