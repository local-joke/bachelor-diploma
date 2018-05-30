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

import {removeItem, addItem, insertItem} from "../helpers"

const books = (state = {
    currentBook: null,
    isFetching: true,
    isAdding: false,
    isDeleting: false,
    items: []
}, action) => {
    switch (action.type) {

        case FETCH_BOOKS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.response
            });

        case ADD_BOOK:
            return Object.assign({}, state, {
                isAdding: true,
            })

        case ADD_BOOK_SUCCESS:
            return Object.assign({}, state, {
                isAdding: false,
                items: addItem(state.items, action)
            })

        case GET_CURRENT_BOOK:
            let book
            state.items.forEach((item) => {
                if (item.id === action.id) {
                    book = item
                }
            })
            return Object.assign({}, state, {
                currentBook: book
            });

        case DELETE_BOOK:
            return Object.assign({}, state, {
                isDeleting: true,
            })

        case DELETE_BOOK_SUCCESS:
            return Object.assign({}, state, {
                isDeleting: false,
                items: removeItem(state.items, action)
            })

        case EDIT_BOOK_SUCCESS:
            return Object.assign({}, state, {
                items: insertItem(state.items, action)
            })

        case CLEAR_CURRENT_BOOK:
            return Object.assign({}, state, {
                currentBook: null
            });

        default:
            return state;
    }
}

export default books