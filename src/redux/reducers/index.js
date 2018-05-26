import { combineReducers } from 'redux'
import notes from './notes'
import documents from './documents'
import currentFile from './files'
import books from './books'
import auth from './auth'
import folders from './folders'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    notes,
    documents,
    currentFile,
    books,
    auth,
    folders,
    form: formReducer
})