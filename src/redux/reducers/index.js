import { combineReducers } from 'redux'
import notes from './notes'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    notes,
    form: formReducer
})