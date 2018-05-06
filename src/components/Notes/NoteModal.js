import React, {Component} from 'react';
import {
    Button,
    Modal,
} from 'react-bootstrap'
import '../../styles/notes.css'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {reduxForm} from 'redux-form'
import {noteFields} from "./noteFields"
import moment from 'moment'

class NoteModal extends Component {
    constructor(props) {
        super(props);

        this.handleHide = this.handleHide.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleHide() {
        this.props.clearFields('noteForm')
        this.props.modalCloseHandler();
    }

    handleSubmit(values) {
        let body = {
            id: values.id,
            //idCreator: this.props.currentUser.profile.Id,
            IsImportant: values.IsImportant,
            DateOfCreation: values.DateOfCreation,
            DateOfChange: moment(),
            HeaderText: values.HeaderText,
            NoteText: values.NoteText
        }
        console.log(body)
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
                    type="button"
                    disabled={pristine || submitting}
                    bsStyle='danger'
                    onClick={this.handleHide}
                >
                    Отменить
                </Button>
                <Button
                    type="submit"
                    disabled={pristine || invalid || submitting}
                    bsStyle='primary'
                >
                    Сохранить
                </Button>
            </Modal.Footer>
            </form>
        </Modal>
    }
}

NoteModal = reduxForm({
    // a unique name for the form
    form: 'noteForm',
    enableReinitialize: true
})(NoteModal)

NoteModal = connect( state => ({
    initialValues: state.notes.currentNote
}))((NoteModal))

export default NoteModal

