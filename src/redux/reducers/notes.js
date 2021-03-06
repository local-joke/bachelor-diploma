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

const sortFunction = (a, b) => {

    a = new Date(a.DateOfChange ? a.DateOfChange : a.DateOfCreation)
    b = new Date(b.DateOfChange ? b.DateOfChange : b.DateOfCreation)

    return a>b ? -1 : a<b ? 1 : 0;
}

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
                items: action.response && action.response.sort(sortFunction)
            });

        case GET_CURRENT_NOTE:
            let note
            state.items.forEach((item) => {
                if (item.id === action.id) {
                    note = item
                }
            })
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
                items: addItem(state.items, action).sort(sortFunction)
            })

        case DELETE_NOTE:
            return Object.assign({}, state, {
                isDeleting: true,
            })

        case DELETE_NOTE_SUCCESS:
            return Object.assign({}, state, {
                items: removeItem(state.items, action)
            })

        case EDIT_NOTE_SUCCESS:
            return Object.assign({}, state, {
                items: insertItem(state.items, action).sort(sortFunction)
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