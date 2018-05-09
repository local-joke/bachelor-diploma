import axios from 'axios'

const apiURL = 'http://127.0.0.1:5000/'

export function getMethod(action) {
    return (dispatch) => {
        return axios.get(apiURL + action(null).endpoint)
            .then((response) => {
                dispatch(action(response.data))
            })
            .catch((error) => console.log(error))
    }
}

export function postMethod(action, body){
    return (dispatch) => {
        return axios.post(apiURL + action(null).endpoint, body)
            .then((response) => {
                dispatch(action(response.data))
            })
            .catch((error) => console.log(error))
    }
}

export function deleteMethod(action, id) {
    return (dispatch) => {
        return axios.delete(apiURL + action(null).endpoint + id)
            .then((response) => {
                dispatch(action(response.data))
            })
            .catch((error) => console.log(error))
    }
}

export function putMethod(action, body){
    return (dispatch) => {
        console.log('ACTION BODY', action, body)
        return axios.put(apiURL + action(null).endpoint + body.id, body)
            .then((response) => {
                console.log('RESPONSE', response.data)
                dispatch(action(response.data))
            })
            .catch((error) => console.log(error))
    }
}