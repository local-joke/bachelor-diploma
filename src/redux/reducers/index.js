import { combineReducers } from 'redux'
import notes from './notes'
import documents from './documents'
import currentFile from './files'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    notes,
    documents,
    currentFile,
    form: formReducer
})