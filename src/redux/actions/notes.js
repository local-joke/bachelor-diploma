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

export function getNotes(notes) {
    return {
        types: [FETCH_NOTES, FETCH_NOTES_SUCCESS, NOTES_FAILURE],
        endpoint: 'GetNotesByUserId?userId=',
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
        types: [ADD_NOTE, ADD_NOTE_SUCCESS, NOTES_FAILURE],
        endpoint: 'PostNote',
        response: body
    }
}

export function deleteNote(id) {
    return {
        types: [DELETE_NOTE, DELETE_NOTE_SUCCESS, NOTES_FAILURE],
        endpoint: 'DeleteNote?id=',
        response: id
    }
}

export function editNote(body) {
    return {
        types: [EDIT_NOTE, EDIT_NOTE_SUCCESS, NOTES_FAILURE],
        endpoint: 'PutNote?id=',
        response: body
    }
}