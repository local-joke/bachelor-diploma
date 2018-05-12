import {
    FETCH_NOTES,
    GET_CURRENT_NOTE,
    CLEAR_CURRENT_NOTE,
    ADD_NOTE,
    EDIT_NOTE,
    DELETE_NOTE
} from '../constants/index'

import {removeItem, addItem, insertItem} from "../helpers"

const notes = (state = {
    currentNote: null,
    items: []
}, action) => {
    switch (action.type) {
        case FETCH_NOTES:
            return Object.assign({}, state, {
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
            console.log('REDUCER ADD NOTE', action.body)
            return Object.assign({}, state, {
                items: addItem(state.items, action)
            })

        case DELETE_NOTE:
            console.log('DELETE NOTE',removeItem(state.items, action))
            return Object.assign({}, state, {
                items: removeItem(state.items, action)
            })

        case EDIT_NOTE:
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