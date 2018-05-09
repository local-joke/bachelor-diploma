import React, {Component} from 'react';
import {
    Button,
    Modal,
} from 'react-bootstrap'
import '../../styles/notes.css'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {noteFields} from "./noteFields"
import {bindActionCreators} from 'redux'
import moment from 'moment'
import {
    //api
    deleteNote,
    editNote,
} from '../../redux/actions/notes'
import { deleteMethod, putMethod } from '../../api/index'

class NoteModal extends Component {
    constructor(props) {
        super(props);

        this.handleHide = this.handleHide.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteNote = this.deleteNote.bind(this)
    }

    handleHide() {
        this.props.reset()
        this.props.clearFields('noteForm')
        this.props.modalCloseHandler();
    }

    handleSubmit(values) {
        let body = {
            id: values.id,
            idCreator: 1, //idCreator: this.props.currentUser.profile.Id,
            IsImportant: values.IsImportant ? 1 : 0,
            DateOfCreation: values.DateOfCreation,
            DateOfChange: moment().format('YYYY-MM-DD HH:MM:SS'),
            HeaderText: values.HeaderText,
            NoteText: values.NoteText
        }
        console.log(body)
        this.props.putMethod(editNote, body)
        this.props.modalCloseHandler()
    }

    deleteNote(){
        this.props.deleteMethod(deleteNote, this.props.initialValues.id)
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
                {noteFields()}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    style={{marginLeft: '5px', float: 'left'}}
                    type="button"
                    bsStyle='danger'
                    onClick={this.deleteNote}
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

NoteModal = reduxForm({
    // a unique name for the form
    form: 'noteForm',
    enableReinitialize: true
})(NoteModal)

NoteModal = connect( state => ({
    initialValues: state.notes.currentNote
}), mapDispatchToProps )((NoteModal))

export default NoteModal

