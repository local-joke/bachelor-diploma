import React, {Component} from 'react';
import {ReactReader} from 'react-reader'
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
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    //non-api
    setCurrentFile,
    clearCurrentFile
} from "../redux/actions/files"
import FileViewModal from './common/FileViewModal'
import {getMethod, postMethod, deleteMethod} from '../api/index'
import {withRouter} from 'react-router-dom'
//import {CSSTransitionGroup} from 'react-transition-group'

class BooksController extends Component {
    constructor(props) {
        super(props)
        console.log('WOW CONSTRUCTOR')
        this.state = {
            showModal: false,
            idCounter: 1,
            books: [
                {
                    Id: 0,
                    CatalogId: 2,
                    Title: 'Alice in wonderland',
                    Date: '2012-12-1',
                    URL: 'https://s3-eu-west-1.amazonaws.com/react-reader/alice.epub'
                }
            ]
        }
        this.addBook = this.addBook.bind(this);
        this.clearBook = this.clearBook.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    addBook() {
        let newBook = {
            Id: this.state.idCounter,
            Title: this.title.value,
            URL: this.url.value,
        }
        let books = this.state.books
        books.push(newBook)
        this.setState({
            idCounter: this.state.idCounter++,
            books: books,
        })
        this.title.value = ''
        this.url.value = ''
    }

    clearBook() {
        this.title.value = ''
        this.url.value = ''
    }

    openModal(book) {
        this.props.setCurrentFile(book)
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

    render() {

        return <Col xs={12}>
            <Row>
                <Panel id="collapsible-panel-example-2">
                    <Panel.Heading style={{backgroundColor: 'white'}}>
                        <Panel.Title toggle>
                            Создать книгу
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <FormGroup>
                                <ControlLabel>Название</ControlLabel>
                                <FormControl
                                    id="formControlsText"
                                    type="text"
                                    inputRef={(input) => this.title = input}
                                    label="Text"
                                    placeholder="Введите название..."/>
                            </FormGroup>
                            <FormGroup controlId="formControlsTextarea">
                                <ControlLabel>URL-адрес</ControlLabel>
                                <FormControl
                                    inputRef={(input) => this.url = input}
                                    type="text"
                                    placeholder="Введите текст"/>
                            </FormGroup>
                        </Panel.Body>
                        <Panel.Footer style={{textAlign: 'right', backgroundColor: 'white'}}>
                            <Button style={{marginRight: '5px'}} onClick={this.clearBook}>Очистить</Button>
                            <Button onClick={this.addBook}>Сохранить</Button>
                        </Panel.Footer>
                    </Panel.Collapse>
                </Panel>
            </Row>
            <Row>
                {/*<CSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>*/}
                    {this.state.books.map((book, key) => {
                        let previewText = (book.Title.length > 40) ? book.Title.substr(0, 38) + '...' : book.Title
                        return <div key={key} className="book-container">
                            <div className="book-left-part">
                            </div>
                            <div key={key} className="book" onClick={() => this.openModal(book)}>
                                {previewText}
                            </div>
                        </div>
                    })}
                {/*</CSSTransitionGroup>*/}
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
        clearCurrentFile
    }, dispatch)
}

/*function mapStateToProps(state) {
    return {
        documents: state.documents.items
    }
}*/

export default withRouter(connect(null, mapDispatchToProps)(BooksController))