import axios from 'axios'

const apiURL = 'http://127.0.0.1:5000/'

export function getMethod(action, userId) {
    let actionObject = action(null)
    return (dispatch) => {
        dispatch({type: actionObject.types[0]})
        axios.get(apiURL + actionObject.endpoint + userId)
            .then((response) => {
                dispatch({
                    type: actionObject.types[1],
                    response: action(response.data).response
                })
            })
            .catch((error) => dispatch({
                type: actionObject.types[2],
                error: error
            }))
    }
}

export function postMethod(action, body) {
    let actionObject = action(null)
    return (dispatch) => {
        dispatch({type: actionObject.types[0]})
        axios.post(apiURL + actionObject.endpoint, body)
            .then((response) => {
                console.log('POST', response.data)
                if (response.data.message) {
                    alert(response.data.message)
                }
                else if ((actionObject.types[1] === 'SIGN_UP_USER_SUCCESS') || (actionObject.types[1] === 'SIGN_IN_USER_SUCCESS')) {
                    console.log('POST SIGN UP', response.data)
                    localStorage.setItem('user_name', response.data.user.Login)
                    localStorage.setItem('access_token', response.data.access_token)
                    dispatch({
                        type: actionObject.types[1],
                        response: action(response.data).response
                    })
                }
            })
            .catch((error) => {
                alert(error)
                dispatch({
                    type: actionObject.types[2],
                    error: error
                })
            })
    }
}

export function deleteMethod(action, id) {
    let actionObject = action(null)
    return (dispatch) => {
        dispatch({type: actionObject.types[0]})
        axios.delete(apiURL + actionObject.endpoint + id)
            .then((response) => {
                dispatch({
                    type: actionObject.types[1],
                    response: action(response.data).response
                })
            })
            .catch((error) => dispatch({
                type: actionObject.types[2],
                error: error
            }))
    }
}

export function putMethod(action, body) {
    let actionObject = action(null)
    return (dispatch) => {
        dispatch({type: actionObject.types[0]})
        return axios.put(apiURL + actionObject.endpoint + body.id, body)
            .then((response) => {
                dispatch({
                    type: actionObject.types[1],
                    response: action(response.data).response
                })
            })
            .catch((error) => dispatch({
                type: actionObject.types[2],
                error: error
            }))
    }
}