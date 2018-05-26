import React, {Component} from 'react';
import {
    Button,
    Modal,
} from 'react-bootstrap'
import '../../styles/notes.css'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'
import {bindActionCreators} from 'redux'
import {
    //api
    deleteFolder,
    editFolder,
} from '../../redux/actions/folders'
import { deleteMethod, putMethod } from '../../api/index'
import {getCurrentDate} from '../../redux/helpers'
import {formInput} from "../common/FormFields"

class FolderModal extends Component {
    constructor(props) {
        super(props);

        this.handleHide = this.handleHide.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteFolder = this.deleteFolder.bind(this)
    }

    handleHide() {
        this.props.reset()
        this.props.clearFields('folderForm')
        this.props.modalCloseHandler();
    }

    handleSubmit(values) {
        let body = {
            id: values.id,
            idCreator: this.props.currentUser.id,
            idParentFolder: values.idParentFolder,
            DateOfCreation: values.DateOfCreation,
            DateOfChange: getCurrentDate(),
            Name: values.Name
        }
        console.log(body)
        this.props.putMethod(editFolder, body)
        this.props.modalCloseHandler()
    }

    deleteFolder(){
        this.props.deleteMethod(deleteFolder, this.props.initialValues.id)
        this.props.modalCloseHandler()
    }

    render() {
        const {
            handleSubmit, pristine, submitting, invalid,
            showModal, size
        } = this.props;

        return <Modal show={showModal} bsSize='lg' onHide={this.handleHide} style={{zIndex: '2000', height: '500px'}}>
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <Modal.Body style={{height: '400px'}}>
                    <Field
                        name="Name"
                        component={formInput}
                        placeholder="Введите название папки"
                        type="text"
                        label="Название"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{marginLeft: '5px', float: 'left'}}
                        type="button"
                        bsStyle='danger'
                        onClick={this.deleteFolder}
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

FolderModal = reduxForm({
    // a unique name for the form
    form: 'folderForm',
    enableReinitialize: true
})(FolderModal)

FolderModal = connect( state => ({
    currentUser: state.auth.currentUser,
    initialValues: state.folders.editingFolder
}), mapDispatchToProps )((FolderModal))

export default FolderModal

