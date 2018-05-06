import {
    FETCH_NOTES,
    GET_CURRENT_NOTE,
    CLEAR_CURRENT_NOTE,
    ADD_NOTE,
    EDIT_NOTE,
    DELETE_NOTE
} from '../constants/index'
import axios from 'axios'

const apiURL = 'http://127.0.0.1:5000/'

export function fetchNotes() {
    return (dispatch) => {
        return axios.get(apiURL + "GetNotesByCreatorId?creatorId=1")
            .then((response) => {
                dispatch(getNotes(response.data))
            })
            .catch((error) => console.log(error))
    }
}

export function getNotes(notes) {
    return {
        type: FETCH_NOTES,
        payload: notes
    }
}

export function getCurrentNote(id) {
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

export function postNote(body){
    return (dispatch) => {
        return axios.post(apiURL + 'PostNote', body)
            .then((response) => {
                dispatch(addNote(response.data))
            })
            .catch((error) => console.log(error))
    }
}

export function addNote(body) {
    console.log('ADD NOTE RESPONSE', body)
    return {
        type: ADD_NOTE,
        body: body
    }
}