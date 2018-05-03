import {
    FETCH_NOTES
} from '../constants/index'

const notes = (state = {
    isFetching: true,
    items: []
}, action) => {
    switch (action.type){
        case FETCH_NOTES:
            console.log('REDUCER', action)
            return{
                isFetching: false,
                items: action.payload
            }
        default:
            return state;
    }
}

export default notes