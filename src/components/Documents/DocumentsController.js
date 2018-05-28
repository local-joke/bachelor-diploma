import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    Col,
    Row,
    Button,
    Modal,
    Popover,
    Glyphicon,
    OverlayTrigger,
    ControlLabel,
    Panel
} from 'react-bootstrap'
import '../../styles/notes.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
    //api
    getDocuments,
    addDocument,
    editDocument,
    deleteDocument,
} from '../../redux/actions/documents'
import {
    //non-api
    setCurrentFile,
    clearCurrentFile,
    setDroppedFile,
    clearDroppedFile
} from "../../redux/actions/files"
import {getMethod, postMethod, deleteMethod, putMethod} from '../../api/index'
import {withRouter} from 'react-router-dom'
import Dropzone from 'react-dropzone'
import FileViewer from 'react-file-viewer'
import {getCurrentDate} from '../../redux/helpers'
import FileViewModal from '../common/FileViewModal'
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import ImagesViewer from './Images/ImagesViewer'
import Document from './Document'
import Folders from '../Folders/Folders'
import Preloader from '../common/Preloader'
import Drop from './Drop'

class DocumentsController extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            docTypes: []
        }
        this.addDocumentHandler = this.addDocumentHandler.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.clearDrop = this.clearDrop.bind(this)
        this.moveDocument = this.moveDocument.bind(this)
    }

    moveDocument(document, destinationFolderId) {
        let body = {
            id: document.id,
            idFolder: destinationFolderId,
            DateOfChange: getCurrentDate(),
        }
        console.log('put', document)
        this.props.putMethod(editDocument, body)
    }

    getMoveOptions() {
        return this.props.folders.items.filter(folder => {
            return folder.idParentFolder === this.props.currentFolder
        })
    }

    openModal(doc) {
        this.props.setCurrentFile(doc)
        this.setState({
            showModal: true,
        })
    }

    closeModal() {
        this.props.clearCurrentFile()
        this.setState({
            showModal: false
        })
    }

    onDrop(acceptedFiles) {
        this.props.setDroppedFile(acceptedFiles[0])
    }

    clearDrop() {
        this.props.clearDroppedFile()
    }

    addDocumentHandler() {
        let droppedFile = this.props.droppedFile
        if (droppedFile.name.length < 45) {
            let formData = new FormData()
            formData.append('newFile', droppedFile, droppedFile.name)
            formData.append('userLogin', this.props.auth.currentUser.Login)
            let body = {
                idCreator: this.props.auth.currentUser.id,
                idFolder: this.props.currentFolder,
                DateOfCreation: getCurrentDate(),
                Type: droppedFile.name.substr(droppedFile.name.lastIndexOf('.') + 1).toLowerCase(),
                Name: droppedFile.name,

            }
            formData.append('fileInfo', JSON.stringify(body))
            console.log('FORM DATA', body)
            this.props.postMethod(addDocument, formData)
            this.props.clearDroppedFile()
        }
        else {
            alert("У файла занадто довга назва!")
        }
    }

    deleteDocument(id) {
        console.log('DELETE', id)
        this.props.deleteMethod(deleteDocument, id)
    }

    componentDidMount() {
        this.props.auth.currentUser.id &&
        this.props.getMethod(getDocuments, this.props.auth.currentUser.id)
    }

    componentWillUnmount() {
        this.props.clearDroppedFile()
    }

    render() {

        let {documents, currentFolder, droppedFile, imagesMode} = this.props

        return <Preloader isLoading={documents.isFetching}>
            <Col xs={12}>
                <Row>
                    <Folders/>
                </Row>
                <Row>
                    {imagesMode ? <ImagesViewer
                            onDrop={this.onDrop}
                            droppedFile={droppedFile}
                            clearDrop={this.clearDrop}
                            addImageHandler={this.addDocumentHandler}
                            deleteImage={this.deleteDocument}
                            moveOptions={this.getMoveOptions()}
                            moveImage={this.moveDocument}
                            higherLevelFolder={this.props.folders.currentFolder && this.props.folders.currentFolder.idParentFolder}
                        />
                        : <Col xs={12}>
                            <Row>
                                <div>
                                    <ControlLabel>Документи </ControlLabel>
                                </div>
                                <Drop
                                    isLoading={documents.isAdding}
                                    onDrop={this.onDrop}
                                    droppedFile={droppedFile}
                                    clearDrop={this.clearDrop}
                                    addDocumentHandler={this.addDocumentHandler}
                                    className='documentDropzoneContainer'
                                    dropzoneClassName="documentDropzone"
                                />
                                {documents.items.map((doc, key) => {
                                    if (doc.idFolder === this.props.currentFolder)
                                        return <Document
                                            key={key}
                                            openModal={this.openModal}
                                            doc={doc}
                                            deleteDocument={this.deleteDocument}
                                            moveOptions={this.getMoveOptions()}
                                            moveDocument={this.moveDocument}
                                            higherLevelFolder={this.props.folders.currentFolder && this.props.folders.currentFolder.idParentFolder}
                                        />
                                })}
                            </Row>
                        </Col>}
                </Row>
                <FileViewModal
                    size="large"
                    show={this.state.showModal}
                    modalCloseHandler={this.closeModal}
                />
            </Col>
        </Preloader>
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getMethod,
        postMethod,
        putMethod,
        deleteMethod,
        setCurrentFile,
        clearCurrentFile,
        setDroppedFile,
        clearDroppedFile
    }, dispatch)
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        currentFolder: state.folders.currentFolder ? state.folders.currentFolder.id : 0,
        droppedFile: state.currentFile.droppedFile,
        documents: state.documents,
        folders: state.folders,
        images: state.documents.images
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentsController))
