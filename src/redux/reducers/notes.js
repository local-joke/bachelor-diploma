import {
    FETCH_NOTES,
    GET_CURRENT_NOTE,
    CLEAR_CURRENT_NOTE,
    ADD_NOTE,
    EDIT_NOTE,
    DELETE_NOTE
} from '../constants/index'

function removeItem(array, action) {
    return array.filter( (item) => item.id !== Number(action.response.id));
}

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
                items: [
                    ...state.items,
                    action.response[0]
                ]
            })

        case DELETE_NOTE:
            console.log('DELETE NOTE',removeItem(state.items, action))
            return Object.assign({}, state, {
                items: removeItem(state.items, action)
            })

        case EDIT_NOTE:
            return Object.assign({}, state, {
                items: state.items.map((item) => {
                    if (item.id === action.response[0].id) {
                        return action.response[0]
                    }
                    else return item
                })
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