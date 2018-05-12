import {
    FETCH_DOCUMENTS,
    GET_CURRENT_DOCUMENT,
    CLEAR_CURRENT_DOCUMENT,
    ADD_DOCUMENT,
    EDIT_DOCUMENT,
    DELETE_DOCUMENT
} from '../constants/index'

export function getDocuments(documents) {
    return {
        type: FETCH_DOCUMENTS,
        endpoint: 'GetDocumentsByCreatorId?creatorId=1',
        response: documents
    }
}

export function addDocument(body) {
    return {
        type: ADD_DOCUMENT,
        endpoint: 'PostDocument',
        response: body
    }
}

export function deleteDocument(id) {
    return {
        type: DELETE_DOCUMENT,
        endpoint: 'DeleteDocument?id=',
        response: id
    }
}

export function editDocument(body) {
    console.log('ACTION', body)
    return {
        type: EDIT_DOCUMENT,
        endpoint: 'PutDocument?id=',
        response: body
    }
}