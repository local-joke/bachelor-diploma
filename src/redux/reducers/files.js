import {
    CLEAR_CURRENT_FILE,
    SET_CURRENT_FILE
} from '../constants'

function currentFile( state = {
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
        default:
            return state
    }
}

export default currentFile