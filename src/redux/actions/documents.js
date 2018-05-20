import {
    FETCH_DOCUMENTS,
    FETCH_DOCUMENTS_SUCCESS,
    ADD_DOCUMENT,
    ADD_DOCUMENT_SUCCESS,
    DELETE_DOCUMENT,
    DELETE_DOCUMENT_SUCCESS,
    DOCUMENT_FAILURE,
} from '../constants/index'
import {uploadFile, deleteFile} from './files'

export function getDocuments(documents) {
    return {
        types: [FETCH_DOCUMENTS, FETCH_DOCUMENTS_SUCCESS, DOCUMENT_FAILURE],
        endpoint: 'GetDocumentsByUserId?userId=',
        response: documents
    }
}

export function addDocument(body) {
    return uploadFile([ADD_DOCUMENT, ADD_DOCUMENT_SUCCESS, DOCUMENT_FAILURE], body, 'document')
}

export function deleteDocument(id) {
    return deleteFile([DELETE_DOCUMENT, DELETE_DOCUMENT_SUCCESS, DOCUMENT_FAILURE], 'document', id)
}