import {
    CLEAR_CURRENT_FILE,
    SET_CURRENT_FILE,
    UPLOAD_FILE,
    DELETE_FILE,
    SET_DROPPED_FILE,
    CLEAR_DROPPED_FILE
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

export function uploadFile(actionType, body, controllerName) {
    return {
        type: actionType,
        endpoint: 'PostFile?controllerName=' + controllerName,
        response: body
    }
}

export function deleteFile(actionType, controllerName, fileId){
    return {
        type: actionType,
        endpoint: 'DeleteFile?controllerName=' + controllerName + '&id=',
        response: fileId
    }
}

export function setDroppedFile(file) {
    console.log('SET DROPPED FILE', file)
    return {
        type: SET_DROPPED_FILE,
        file
    }
}

export function clearDroppedFile() {
    return {
        type: CLEAR_DROPPED_FILE
    }
}
