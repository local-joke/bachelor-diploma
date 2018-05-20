import {
    FETCH_BOOKS,
    FETCH_BOOKS_SUCCESS,
    GET_CURRENT_BOOK,
    CLEAR_CURRENT_BOOK,
    ADD_BOOK,
    ADD_BOOK_SUCCESS,
    EDIT_BOOK,
    EDIT_BOOK_SUCCESS,
    DELETE_BOOK,
    DELETE_BOOK_SUCCESS,
    BOOK_FAILURE
} from '../constants/index'
import {uploadFile, deleteFile} from './files'

export function getBooks(books) {
    return {
        types: [FETCH_BOOKS, FETCH_BOOKS_SUCCESS, BOOK_FAILURE],
        endpoint: 'GetBooksByUserId?userId=',
        response: books
    }
}

export function addBook(body) {
    return uploadFile([ADD_BOOK, ADD_BOOK_SUCCESS, BOOK_FAILURE], body, 'book')
}

export function deleteBook(id) {
    return deleteFile([DELETE_BOOK,DELETE_BOOK_SUCCESS, BOOK_FAILURE], 'book', id)
}

export function editBook(body) {
    console.log('ACTION', body)
    return {
        types: [EDIT_BOOK, EDIT_BOOK_SUCCESS, BOOK_FAILURE],
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