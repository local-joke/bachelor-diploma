import {
    SIGN_UP_USER,
    SIGN_UP_USER_SUCCESS,
    SING_IN_USER,
    SIGN_IN_USER_SUCCESS,
    USER_FAILURE,
    CHECK_AUTH,
    SIGN_OUT
} from '../constants/index'

function auth( state = {
    isFetching: true,
    currentUser: null,
    isAuthenticated: false,
    access_token: null,
}, action) {
    switch (action.type) {

        case CHECK_AUTH:
            return Object.assign({}, state, {
                isAuthenticated: !!localStorage.getItem('user_name') || false,
                access_token: localStorage.getItem('access_token') || null,
            });

        case SIGN_UP_USER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                currentUser: action.response.user,
                isAuthenticated: true,
                access_token:  action.response.access_token,
            });

        case SIGN_IN_USER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                currentUser: action.response.user,
                isAuthenticated: true,
                access_token:  action.response.token,
            });

        case SIGN_OUT:
            return Object.assign({}, state, {
                isFetching: true,
                currentUser: null,
                isAuthenticated: false,
                access_token: null,
            });

        default:
            return state
    }
}

export default auth