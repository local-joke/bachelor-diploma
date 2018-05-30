import React, {Component} from 'react';
import {ReactReader} from 'react-reader'
import {
    Col,
    Row,
    Button,
    FormGroup,
    Glyphicon,
    FormControl,
    Panel,
    ControlLabel
} from 'react-bootstrap'
import '../../styles/notes.css'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    //non-api
    setCurrentFile,
    clearCurrentFile,
    setDroppedFile,
    clearDroppedFile
} from "../../redux/actions/files"
import {
    //api
    addBook,
    getBooks,
    //non-api
    setCurrentBook,
    clearCurrentBook
} from "../../redux/actions/books"
import FileViewModal from '../common/FileViewModal'
import {getMethod, postMethod, deleteMethod} from '../../api/index'
import {withRouter} from 'react-router-dom'
import {bookFields} from "./bookFields"
import {getCurrentDate} from "../../redux/helpers"
import BookModal from './BookModal'
import Dropzone from 'react-dropzone'
import {reduxForm, reset} from 'redux-form'
//import {CSSTransitionGroup} from 'react-transition-group'
import Preloader from '../common/Preloader'
import {checkString} from "../../redux/helpers"

class Book extends Component {
    render() {
        let book = this.props.book
        let previewText = (book.Title.length > 40) ? book.Title.substr(0, 38) + '...' : book.Title
        return <div className="book-container">
            <div className="book-left-part">
                <Glyphicon
                    glyph="option-vertical"
                    bsSize="large"
                    className="paperclip"
                    onClick={() => this.props.openEditModal(book.id)}
                />
            </div>
            <div className="book" onClick={() => this.props.openViewModal(book)}>
                <h5>{book.Author && book.Author}</h5>
                <div>{previewText}</div>
            </div>
        </div>
    }
}

class BooksController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showViewModal: false,
            showEditModal: false,
        }
        this.addBookHandleSubmit = this.addBookHandleSubmit.bind(this);
        this.openViewModal = this.openViewModal.bind(this)
        this.closeViewModal = this.closeViewModal.bind(this)
        this.openEditModal = this.openEditModal.bind(this)
        this.closeEditModal = this.closeEditModal.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.resetNewBookData = this.resetNewBookData.bind(this)
    }

    addBookHandleSubmit(values) {
        let droppedFile = this.props.droppedFile
        let formData = new FormData()
        formData.append('newFile', droppedFile, droppedFile.name)
        formData.append('userLogin', this.props.auth.currentUser.Login)
        let body = {
            idCreator: this.props.auth.currentUser.id,
            idFolder: null,
            DateOfCreation: getCurrentDate(),
            Author: checkString(values.Author),
            Title: checkString(values.Title),
            Publisher: checkString(values.Publisher),
            Year: checkString(values.Year),
        }
        formData.append('fileInfo', JSON.stringify(body))
        this.props.postMethod(addBook, formData)
        this.props.clearDroppedFile()
        this.props.clearFields()
    }

    onDrop(acceptedFiles) {
        this.props.setDroppedFile(acceptedFiles[0])
    }

    resetNewBookData() {
        this.props.reset()
        this.props.clearDroppedFile()
    }

    openEditModal(id) {
        this.props.setCurrentBook(id)
        this.setState({
            showEditModal: true
        })
    }

    closeEditModal() {
        this.props.clearCurrentBook()
        this.setState({
            showEditModal: false
        })
    }

    openViewModal(book) {
        this.props.setCurrentFile(book)
        this.setState({
            showViewModal: true,
        })
    }

    closeViewModal() {
        this.props.clearCurrentFile()
        this.setState({
            showViewModal: false
        })
    }

    componentDidMount() {
        this.props.getMethod(getBooks, this.props.auth.currentUser.id)
    }

    componentWillUnmount() {
        this.props.clearDroppedFile()
    }

    render() {

        const {handleSubmit, pristine, submitting, books, droppedFile} = this.props
        return <Preloader isLoading={books.isFetching}>
            <Col xs={12}>
                <Row>
                    <form onSubmit={handleSubmit(this.addBookHandleSubmit)}>
                        <Panel id="collapsible-panel-example-2">
                            <Panel.Heading style={{backgroundColor: 'white'}}>
                                <Panel.Title toggle>
                                    Додати книгу
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Collapse>
                                <Preloader isLoading={books.isAdding}>
                                    <Panel.Body>
                                        <Col xs={12} sm={6}>
                                            <Row>
                                                {bookFields()}
                                            </Row>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <Row>
                                                <div className="bookDropzoneContainer">
                                                    = <Dropzone
                                                    onDropAccepted={this.onDrop}
                                                    className="bookDropzone"
                                                    multiple={false}
                                                    accept=".epub"
                                                >
                                                    {droppedFile ?
                                                        <li>
                                                            {((droppedFile.name.length > 16) ?
                                                                droppedFile.name.substr(0, 13) + '...'
                                                                : droppedFile.name)}
                                                        </li> :
                                                        <p>Перетягніть файл сюди або натисніть, щоб вибрати (.epub)</p>
                                                    }
                                                </Dropzone>
                                                </div>
                                            </Row>
                                        </Col>
                                    </Panel.Body>
                                    <Panel.Footer style={{textAlign: 'right', backgroundColor: 'white'}}>
                                        <Button
                                            style={{marginRight: '5px'}}
                                            type="button"
                                            disabled={pristine || submitting}
                                            onClick={this.resetNewBookData}
                                            bsStyle="default">
                                            Очистити
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={pristine || submitting}
                                            bsStyle="success">
                                            Зберегти
                                        </Button>
                                    </Panel.Footer>
                                </Preloader>
                            </Panel.Collapse>
                        </Panel>
                    </form>
                </Row>
                <Row>
                    {books.items && books.items.map((book, key) => {
                        return <Book
                            key={key}
                            book={book}
                            openViewModal={this.openViewModal}
                            openEditModal={this.openEditModal}
                        />
                    })}
                </Row>
                <BookModal
                    size="large"
                    showModal={this.state.showEditModal}
                    modalCloseHandler={this.closeEditModal}
                />
                <FileViewModal
                    size="large"
                    show={this.state.showViewModal}
                    modalCloseHandler={this.closeViewModal}
                />
            </Col>
        </Preloader>
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getMethod,
        postMethod,
        deleteMethod,
        setCurrentBook,
        clearCurrentBook,
        setCurrentFile,
        clearCurrentFile,
        setDroppedFile,
        clearDroppedFile
    }, dispatch)
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        droppedFile: state.currentFile.droppedFile,
        books: state.books
    }
}

BooksController = reduxForm({
    // a unique name for the form
    form: 'createBookForm'
})(BooksController)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BooksController))