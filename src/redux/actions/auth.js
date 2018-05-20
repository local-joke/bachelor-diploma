import {
    SIGN_UP_USER,
    SIGN_UP_USER_SUCCESS,
    SING_IN_USER,
    SIGN_IN_USER_SUCCESS,
    USER_FAILURE,
    CHECK_AUTH,
    SIGN_OUT
} from '../constants/index'

export function checkAuth() {
    return {
        type: CHECK_AUTH,
    }
}

export function signUp(body) {
    return {
        types: [SIGN_UP_USER, SIGN_UP_USER_SUCCESS, USER_FAILURE],
        endpoint: 'SignUp',
        response: body
    }
}

export function signIn(body) {
    return {
        types: [SING_IN_USER, SIGN_IN_USER_SUCCESS, USER_FAILURE],
        endpoint: 'SignIn',
        response: body
    }
}

export function signOut() {
    return {
        type: SIGN_OUT
    }
}
