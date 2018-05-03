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
//import {CSSTransitionGroup} from 'react-transition-group'

class BookViewModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            book: null,
            show: false
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow(book) {
        console.log('BOOK',book)
        this.setState({
            show: true,
            book: book
        });
    }

    render(){
        return <Modal show={this.state.show} size={this.props.size} onHide={this.handleClose}>
            <Modal.Body style={{height: '400px'}}>
                <div style={{position: 'relative', height: '100%'}}>
                    {this.state.book && <ReactReader
                        url={this.state.book.URL}
                        title={this.state.book.Title}
                        locationChanged={(epubcifi) => console.log(epubcifi)}
                    />}
                </div>
            </Modal.Body>
        </Modal>
    }
}

export default class NotesController extends Component {
    constructor(props) {
        super(props)
        console.log('WOW CONSTRUCTOR')
        this.state = {
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
        this.bookViewModal.handleShow(book)
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
            <BookViewModal
                size="large"
                ref={c => this.bookViewModal = c}
            />
        </Col>
    }
}