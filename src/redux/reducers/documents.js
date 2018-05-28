import {
    FETCH_DOCUMENTS,
    FETCH_DOCUMENTS_SUCCESS,
    ADD_DOCUMENT,
    ADD_DOCUMENT_SUCCESS,
    DELETE_DOCUMENT,
    DELETE_DOCUMENT_SUCCESS,
    DOCUMENT_FAILURE,
    EDIT_DOCUMENT,
    EDIT_DOCUMENT_SUCCESS,
} from '../constants/index'

import {removeItem, addItem, insertItem} from "../helpers"

const getDocTypes = (docs) => {
    let docTypes = []
    docs && docs.map((doc) => {
        if (docTypes.length !== 0) {
            let typeExists = false
            docTypes.map((docType) => {
                if (docType === doc.Type) {
                    typeExists = true
                }
            })
            if (!typeExists) {
                docTypes.push(doc.Type)
            }
        }
        else {
            docTypes.push(doc.Type)
        }
    })
    return docTypes
}

const documents = (state = {
    isFetching: true,
    isAdding: false,
    isDeleting: false,
    docTypes: [],
    items: []
}, action) => {
    switch (action.type) {

        case FETCH_DOCUMENTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                docTypes: getDocTypes(action.response),
                items: action.response
            });

        case ADD_DOCUMENT:
            return Object.assign({}, state, {
                isAdding: true,
            })

        case ADD_DOCUMENT_SUCCESS:
            return Object.assign({}, state, {
                isAdding: false,
                docTypes: getDocTypes(addItem(state.items, action)),
                items: addItem(state.items, action)
            })

        case DELETE_DOCUMENT:
            return Object.assign({}, state, {
                isDeleting: true,
            })

        case EDIT_DOCUMENT_SUCCESS:
            return Object.assign({}, state, {
                docTypes: getDocTypes(insertItem(state.items, action)),
                items: insertItem(state.items, action)
            })

        case DELETE_DOCUMENT_SUCCESS:
            return Object.assign({}, state, {
                isDeleting: false,
                docTypes: getDocTypes(removeItem(state.items, action)),
                items: removeItem(state.items, action)
            })

        default:
            return state;
    }
}

export default documents