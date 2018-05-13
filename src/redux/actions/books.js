import {
    FETCH_BOOKS,
    GET_CURRENT_BOOK,
    CLEAR_CURRENT_BOOK,
    ADD_BOOK,
    EDIT_BOOK,
    DELETE_BOOK,
} from '../constants/index'
import {uploadFile, deleteFile} from './files'

export function getBooks(books) {
    return {
        type: FETCH_BOOKS,
        endpoint: 'GetBooksByCreatorId?creatorId=1',
        response: books
    }
}

export function addBook(body) {
    return uploadFile(ADD_BOOK, body, 'book')
}

export function deleteBook(id) {
    return deleteFile(DELETE_BOOK, 'book', id)
}

export function editBook(body) {
    console.log('ACTION', body)
    return {
        type: EDIT_BOOK,
        endpoint: 'PutBook?id=',
        response: body
    }
}

export function setCurrentBook(id) {
    return {
        type: GET_CURRENT_BOOK,
        id
    }
}

export function clearCurrentBook() {
    return {
        type: CLEAR_CURRENT_BOOK
    }
}