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
import ImagesViewer from './ImagesViewer'
import Document from './Document'
import Folders from '../Folders/Folders'

class DocumentsController extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
        }
        this.addDocumentHandler = this.addDocumentHandler.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.clearDrop = this.clearDrop.bind(this)
        this.moveDocument = this.moveDocument.bind(this)
    }

    moveDocument(document, destinationFolderId){
        let body = {
            id: document.id,
            idFolder: destinationFolderId,
            DateOfChange: getCurrentDate(),
        }
        console.log('put', body)
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
        console.log('doc submit', droppedFile)
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

    deleteDocument(id) {
        console.log('DELETE', id)
        this.props.deleteMethod(deleteDocument, id)
    }

    getDocumentsTypes() {
        /*  let docTypes = []
          this.state.documents.map((doc) => {
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
          return docTypes*/
    }

    componentDidMount() {
        this.props.auth.currentUser.id && this.props.getMethod(getDocuments, this.props.auth.currentUser.id)
    }

    componentWillUnmount() {
        this.props.clearDroppedFile()
    }

    render() {

        let docTypes = this.getDocumentsTypes()

        return <Col xs={12}>
            <Row>
                <Panel id="collapsible-panel-example-2">
                    <Panel.Heading style={{backgroundColor: 'white'}}>
                        <Panel.Title toggle>
                            {this.props.imagesMode ? 'Загрузить изображение' : 'Загрузить документ'}
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <Dropzone onDrop={this.onDrop}>
                                <p>Try dropping some files here, or click to select files to upload.</p>
                            </Dropzone>
                        </Panel.Body>
                        <Panel.Footer style={{textAlign: 'right', backgroundColor: 'white'}}>
                            <Button
                                style={{marginRight: '5px'}}
                                type="button"
                                bsStyle="default"
                                onClick={this.clearDrop}
                            >
                                Очистить
                            </Button>
                            <Button
                                type="submit"
                                bsStyle="success"
                                onClick={this.addDocumentHandler}
                            >
                                Загрузить
                            </Button>
                        </Panel.Footer>
                    </Panel.Collapse>
                </Panel>
            </Row>
            <Row>
                <Folders/>
            </Row>
            <Row>
                {this.props.imagesMode ? <ImagesViewer/>
                    : this.props.documents.map((doc, key) => {
                        if (doc.idFolder === this.props.currentFolder)
                            return <Document
                                key={key}
                                openModal={this.openModal}
                                document={doc}
                                deleteDocument={this.deleteDocument}
                                moveOptions={this.getMoveOptions()}
                                moveDocument={this.moveDocument}
                                higherLevelFolder={this.props.folders.currentFolder && this.props.folders.currentFolder.idParentFolder}
                            />
                    })}
            </Row>
            <FileViewModal
                size="large"
                show={this.state.showModal}
                modalCloseHandler={this.closeModal}
            />
        </Col>
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
        documents: state.documents.items,
        folders: state.folders,
        images: state.documents.images
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentsController))
