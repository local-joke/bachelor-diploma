import {
    CLEAR_CURRENT_FILE,
    SET_CURRENT_FILE,
    DELETE_FILE,
    SET_DROPPED_FILE,
    CLEAR_DROPPED_FILE
} from '../constants'

function currentFile( state = {
    droppedFile: null,
    file: null
}, action) {

    switch (action.type) {

        case SET_CURRENT_FILE:
            return Object.assign({}, state, {
                file: action.file
            });

        case CLEAR_CURRENT_FILE:
            return Object.assign({}, state, {
                file: null
            })

        case SET_DROPPED_FILE:
            console.log('REDUCER', action.file)
            return Object.assign({}, state, {
                droppedFile: action.file
            })

        case CLEAR_DROPPED_FILE:
            return Object.assign({}, state, {
                droppedFile: null
            })

        default:
            return state
    }
}

export default currentFile