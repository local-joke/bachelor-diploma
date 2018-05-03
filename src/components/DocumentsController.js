import React, {Component} from 'react';
import {ReactReader} from 'react-reader'
import FileViewer from 'react-file-viewer';
import {
    Grid,
    Col,
    Row,
    Button,
    Nav,
    NavItem,
    Navbar,
    NavDropdown,
    MenuItem,
    Modal,
    FormGroup,
    FormControl,
    FieldGroup,
    Panel,
    ControlLabel
} from 'react-bootstrap'
import '../styles/notes.css'
//import {CSSTransitionGroup} from 'react-transition-group'

class DocumentViewModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            document: null,
            show: false
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow(document) {
        console.log('document', document)
        this.setState({
            show: true,
            document: document
        });
    }

    render() {
        return <Modal show={this.state.show} size={this.props.size} onHide={this.handleClose}>
            <Modal.Body style={{height: '900px'}}>
                <div style={{position: 'relative', height: '100%'}}>
                    {this.state.document &&
                    <FileViewer
                        fileType={this.state.document.Type}
                        filePath={this.state.document.URL}
                    />}
                </div>
            </Modal.Body>
        </Modal>
    }
}

export default class DocumentsController extends Component {

    constructor(props) {
        super(props)
        console.log('WOW CONSTRUCTOR')
        this.state = {
            idCounter: 2,
            documents: [
                {
                    Id: 1,
                    CatalogId: 3,
                    Type: 'png',
                    Name: 'Black Square',
                    DateOfCreation: '2012-12-1',
                    URL: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/%D0%A7%D1%91%D1%80%D0%BD%D1%8B%D0%B9_' +
                    '%D1%81%D1%83%D0%BF%D1%80%D0%B5%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%D0%BA%' +
                    'D0%B2%D0%B0%D0%B4%D1%80%D0%B0%D1%82._1915._%D0%93%D0%A2%D0%93.png'
                },
                {
                    Id: 1,
                    CatalogId: 3,
                    Type: 'docx',
                    Name: 'docx test file',
                    DateOfCreation: '2012-12-1',
                    URL: 'https://calibre-ebook.com/downloads/demos/demo.docx'
                }
            ]
        }

    }

    openModal(doc) {
        this.documentViewModal.handleShow(doc)
    }

    getPreviewImage(doc) {
        switch (doc.Type) {
            case 'docx':
                return 'https://upload.wikimedia.org/wikipedia/commons/8/86/Word_2013_Icon.PNG';
            case 'png' :
                return doc.URL
        }
    }

    getDocumentsTypes() {
        let docTypes = []
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
        return docTypes
    }


    render() {
        let docTypes = this.getDocumentsTypes()
        return <Col xs={12}>
            {/*<CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>*/}
                { docTypes.map((type, key) => {
                    return <div key={key}>
                        <ControlLabel>{type.toUpperCase()}</ControlLabel>
                        <Row>
                            {/*<CSSTransitionGroup
                                transitionName="example"
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={300}>*/}
                                {this.state.documents.map((doc, key) => {
                                    if(doc.Type === type){
                                        let previewText = (doc.Name.length > 40) ? doc.Name.substr(0, 38) + '...' : doc.Name
                                        return <div key={key} className="document" onClick={() => this.openModal(doc)}>
                                            <img src={this.getPreviewImage(doc)} width="130px" height="130px"
                                                 alt={doc.Name + '.' + doc.Type}/>
                                            <div style={{position: 'absolute', bottom: '0', textAlign: 'center'}}>{previewText}</div>
                                        </div>
                                    }
                                })}
                            {/*</CSSTransitionGroup>*/}
                        </Row>
                        <hr style={{border:'1px solid #f8f8f8'}}/>
                    </div>}
                )}
            {/*</CSSTransitionGroup>*/}
            <DocumentViewModal
                size="large"
                ref={c => this.documentViewModal = c}
            />
        </Col>
    }
}