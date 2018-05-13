import {
    FETCH_NOTES,
    GET_CURRENT_NOTE,
    CLEAR_CURRENT_NOTE,
    ADD_NOTE,
    EDIT_NOTE,
    DELETE_NOTE
} from '../constants/index'

export function getNotes(notes) {
    return {
        type: FETCH_NOTES,
        endpoint: 'GetNotesByCreatorId?creatorId=1',
        response: notes
    }
}

export function setCurrentNote(id) {
    return {
        type: GET_CURRENT_NOTE,
        id
    }
}

export function clearCurrentNote() {
    return {
        type: CLEAR_CURRENT_NOTE
    }
}

export function addNote(body) {
    return {
        type: ADD_NOTE,
        endpoint: 'PostNote',
        response: body
    }
}

export function deleteNote(id) {
    return {
        type: DELETE_NOTE,
        endpoint: 'DeleteNote?id=',
        response: id
    }
}

export function editNote(body) {
    console.log('ACTION', body)
    return {
        type: EDIT_NOTE,
        endpoint: 'PutNote?id=',
        response: body
    }
}