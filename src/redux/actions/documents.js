import {
    FETCH_DOCUMENTS,
    ADD_DOCUMENT,
    DELETE_DOCUMENT
} from '../constants/index'
import {uploadFile, deleteFile} from './files'

export function getDocuments(documents) {
    return {
        type: FETCH_DOCUMENTS,
        endpoint: 'GetDocumentsByCreatorId?creatorId=1',
        response: documents
    }
}

export function addDocument(body) {
    return uploadFile(ADD_DOCUMENT, body, 'document')
}

export function deleteDocument(id) {
    return deleteFile(DELETE_DOCUMENT, 'document', id)
}