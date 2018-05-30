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
import {deleteMethod, putMethod} from '../../api/index'
import {getCurrentDate} from '../../redux/helpers'
import {checkString} from "../../redux/helpers"

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
            idCreator: this.props.auth.currentUser.id,
            IsImportant: values.IsImportant ? 1 : 0,
            DateOfCreation: values.DateOfCreation,
            DateOfChange: getCurrentDate(),
            HeaderText: checkString(values.HeaderText),
            NoteText: values.NoteText
        }
        this.props.putMethod(editNote, body)
        this.props.modalCloseHandler()
    }

    deleteNote() {
        this.props.deleteMethod(deleteNote, this.props.initialValues.id)
        this.props.modalCloseHandler()
    }

    render() {
        const {
            handleSubmit, pristine, submitting, invalid, initialValues,
            showModal, size
        } = this.props;

        return <Modal show={showModal} size={size} onHide={this.handleHide} className="note-modal">
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <Modal.Body style={{height: '350px'}}>
                    <div>
                        {noteFields()}
                        <h4>Дата створення: {initialValues && moment(initialValues.DateOfCreation).format('YYYY.MM.DD HH:mm:ss')}</h4>
                        <h4>Дата зміни: {initialValues && moment(initialValues.DateOfChange).format('YYYY.MM.DD HH:mm:ss')}</h4>
                    </div>
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

NoteModal = connect(state => ({
    auth: state.auth,
    initialValues: state.notes.currentNote
}), mapDispatchToProps)((NoteModal))

export default NoteModal

