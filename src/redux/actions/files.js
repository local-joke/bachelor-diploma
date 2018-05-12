import {
    CLEAR_CURRENT_FILE,
    SET_CURRENT_FILE
} from '../constants'

export function setCurrentFile(file) {
    return {
        type: SET_CURRENT_FILE,
        file
    }
}

export function clearCurrentFile() {
    return {
        type: CLEAR_CURRENT_FILE
    }
}