import React, {Component} from 'react';
import {
    Button,
    Modal,
} from 'react-bootstrap'
import '../../styles/notes.css'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {bookFields} from "./bookFields"
import {bindActionCreators} from 'redux'
import moment from 'moment'
import {
    //api
    deleteBook,
    editBook,
} from '../../redux/actions/books'
import { deleteMethod, putMethod } from '../../api/index'
import {getCurrentDate} from '../../redux/helpers'
import {checkString} from "../../redux/helpers"

class BookModal extends Component {
    constructor(props) {
        super(props);

        this.handleHide = this.handleHide.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteBook = this.deleteBook.bind(this)
    }

    handleHide() {
        this.props.reset()
        this.props.clearFields('bookForm')
        this.props.modalCloseHandler();
    }

    handleSubmit(values) {
        let body = {
            id: values.id,
            DateOfChange: getCurrentDate(),
            Author: checkString(values.Author),
            Title: checkString(values.Title),
            Publisher: checkString(values.Publisher),
            Year: checkString(values.Year),
        }
        this.props.putMethod(editBook, body)
        this.props.modalCloseHandler()
    }

    deleteBook(){
        this.props.deleteMethod(deleteBook, this.props.initialValues.id)
        this.props.modalCloseHandler()
    }

    render() {
        const {
            handleSubmit, pristine, submitting, invalid,
            showModal, size
        } = this.props;

        return <Modal show={showModal} size={size} onHide={this.handleHide} className="note-modal">
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <Modal.Body style={{height: '400px'}}>
                    {bookFields()}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{marginLeft: '5px', float: 'left'}}
                        type="button"
                        bsStyle='danger'
                        onClick={this.deleteBook}
                    >
                        Удалить
                    </Button>
                    <Button
                        type="button"
                        disabled={pristine || submitting}
                        bsStyle='default'
                        onClick={this.handleHide}
                    >
                        Отменить
                    </Button>
                    <Button
                        type="submit"
                        disabled={pristine || invalid || submitting}
                        bsStyle='success'
                    >
                        Сохранить
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        putMethod,
        deleteMethod,
    }, dispatch)
}

BookModal = reduxForm({
    // a unique name for the form
    form: 'bookForm',
    enableReinitialize: true
})(BookModal)

BookModal = connect( state => ({
    initialValues: state.books.currentBook
}), mapDispatchToProps )((BookModal))

export default BookModal
