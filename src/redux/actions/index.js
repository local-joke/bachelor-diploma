import {
    FETCH_NOTES
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