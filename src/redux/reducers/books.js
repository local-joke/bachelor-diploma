import {
    FETCH_BOOKS,
    GET_CURRENT_BOOK,
    CLEAR_CURRENT_BOOK,
    ADD_BOOK,
    EDIT_BOOK,
    DELETE_BOOK,
} from '../constants/index'

import {removeItem, addItem, insertItem} from "../helpers"

const books = (state = {
    currentBook: null,
    items: []
}, action) => {
    switch (action.type) {

        case FETCH_BOOKS:
            return Object.assign({}, state, {
                items: action.response
            });

        case ADD_BOOK:
            return Object.assign({}, state, {
                items: addItem(state.items, action)
            })

        case GET_CURRENT_BOOK:
            let book
            state.items.forEach((item) => {
                if (item.id === action.id) {
                    book = item
                }
            })
            console.log('REDUCER book', book)
            return Object.assign({}, state, {
                currentBook: book
            });

        case DELETE_BOOK:
            return Object.assign({}, state, {
                items: removeItem(state.items, action)
            })

        case EDIT_BOOK:
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