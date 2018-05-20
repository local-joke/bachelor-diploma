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
    deleteDocument,
} from '../../redux/actions/documents'
import {
    //non-api
    setCurrentFile,
    clearCurrentFile,
    setDroppedFile,
    clearDroppedFile
} from "../../redux/actions/files"
import {getMethod, postMethod, deleteMethod} from '../../api/index'
import {withRouter} from 'react-router-dom'
import Dropzone from 'react-dropzone'
import FileViewer from 'react-file-viewer'
import {getCurrentDate} from '../../redux/helpers'
import FileViewModal from '../common/FileViewModal'
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import ImagesViewer from './ImagesViewer'

const popover = (doc, deleteDocument) => (
    <Popover id="popover-positioned-scrolling-right" style={{width: '500px'}}>
        <ControlLabel>Название:</ControlLabel>
        <div>{doc.Name}</div>
        <ControlLabel>Тип:</ControlLabel>
        <div>{doc.Type}</div>
        <ControlLabel>Дата создания:</ControlLabel>
        <div>{doc.DateOfCreation}</div>
        <hr style={{margin: '10px 0'}}/>
        <div style={{textAlign: 'center'}}>
            <Button
                bsStyle='danger'
                onClick={() => deleteDocument(doc.id)}
            >
                Удалить
            </Button>
        </div>
    </Popover>
);

class DocumentItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showOverlay: false
        }

        this.openOverlay = this.openOverlay.bind(this)
    }

    openOverlay() {
        this.setState({
            showOverlay: true
        })
    }

    getPreviewImage(doc) {
        switch (doc.Type) {
            case 'docx':
                return 'https://upload.wikimedia.org/wikipedia/commons/8/86/Word_2013_Icon.PNG';
            case 'png' :
                return doc.URL
        }
    }

    render() {
        let doc = this.props.document
        let previewText = (doc.Name && ((doc.Name.length > 16) ? doc.Name.substr(0, 13) + '...' : doc.Name))
        return <div className="document">
            <div onClick={() => this.props.openModal(doc)}>
                <img src={this.getPreviewImage(doc)} width="110px" height="110px" style={{marginTop: '20px'}}/>
                <div style={{position: 'absolute', bottom: '0', textAlign: 'center'}}>{previewText}</div>
            </div>
            <OverlayTrigger
                container={this}
                trigger="click"
                rootClose
                placement="bottom"
                overlay={popover(doc, (id) => this.props.deleteDocument(id))}
            >
                <Glyphicon
                    glyph="option-horizontal"
                    bsSize="large"
                    className="paperclip"
                    onClick={this.openOverlay}
                />
            </OverlayTrigger>
        </div>
    }
}

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

    clearDrop(){
        this.props.clearDroppedFile()
    }

    addDocumentHandler() {
        let droppedFile = this.props.droppedFile
        console.log('doc submit', droppedFile)
        let formData = new FormData()
        formData.append('newFile', droppedFile, droppedFile.name)
        let body = {
            idCreator: 1,
            idFolder: null,
            DateOfCreation: getCurrentDate(),
            Type: droppedFile.name.substr(droppedFile.name.lastIndexOf('.') + 1).toLowerCase(),
            Name: droppedFile.name,
            URL: 'local-joke' + '/' + droppedFile.name
        }
        formData.append('fileInfo', JSON.stringify(body))
        console.log('FORM DATA', body)
        this.props.postMethod(addDocument, formData)
        this.props.clearDroppedFile()
    }

    deleteDocument(id){
        console.log('DELETE',id)
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

    componentWillUnmount(){
        this.props.clearDroppedFile()
    }

    render() {

        let docTypes = this.getDocumentsTypes()

        return <Col xs={12}>
            <Row>
                <Panel id="collapsible-panel-example-2" defaultExpanded>
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
                            {/*<Button style={{marginRight: '5px'}} onClick={this.clearNote}>Очистить</Button>
                                <Button onClick={this.addNote}>Сохранить</Button>*/}
                        </Panel.Footer>
                    </Panel.Collapse>
                </Panel>
            </Row>
            <Row>
                {this.props.imagesMode ? <ImagesViewer/>
                    : this.props.documents.map((doc, key) => {
                    return <DocumentItem
                        key={key}
                        openModal={this.openModal}
                        document={doc}
                        deleteDocument={this.deleteDocument}
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
        droppedFile : state.currentFile.droppedFile,
        documents: state.documents.items,
        images: state.documents.images
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentsController))
