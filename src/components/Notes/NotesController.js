import React, {Component} from 'react';
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
    Glyphicon,
    Modal,
    FormGroup,
    FormControl,
    Panel,
    Checkbox,
    ControlLabel
} from 'react-bootstrap'
import '../../styles/notes.css'
import moment from 'moment'
import axios from 'axios'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
    fetchNotes,
    getCurrentNote,
    clearCurrentNote,
    postNote
} from '../../redux/actions/index'
import {withRouter} from 'react-router-dom'
import {Field, reduxForm} from 'redux-form'
import {noteFields} from "./noteFields"
import NoteModal from './NoteModal'
/*class NoteModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            noteHeader: '',
            noteText: '',
            isImportant: '',
            dateOfCreation: moment(),
            show: false
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleChangeHeader = this.handleChangeHeader.bind(this)
        this.handleChangeText = this.handleChangeText.bind(this)
    }

    handleClose() {
        this.setState({show: false});
    }

    handleChangeHeader(e) {
        this.setState({
            noteHeader: e.target.value
        })
    }

    handleChangeText(e) {
        this.setState({
            noteText: e.target.value
        })
    }

    handleShow(note) {
        console.log(note)
        this.setState({
            id: note.id,
            noteHeader: note.HeaderText,
            noteText: note.NoteText,
            dateOfCreation: note.DateOfCreation,
            isImportant: note.IsImportant,
            show: true,
        });
    }

    getNote() {
        return {
            id: this.state.id,
            CatalogId: 1,
            Header: this.state.noteHeader,
            IsImportant: this.state.isImportant,
            DateOfCreation: '2012-12-1',
            DateOfEditing: moment(),
            Text: this.state.noteText
        }
    }

    render() {
        return <Modal show={this.state.show} size={this.props.size} onHide={this.handleClose} className="note-modal">
            <Modal.Body style={{height: '400px'}}>
                <FormGroup>
                    <ControlLabel>Название</ControlLabel>
                    <FormControl
                        id="formControlsText"
                        type="text"
                        value={this.state.noteHeader}
                        label="Text"
                        onChange={this.handleChangeHeader}
                        placeholder="Введите название..."/>
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Текст</ControlLabel>
                    <FormControl
                        style={{height: '270px'}}
                        value={this.state.noteText}
                        componentClass="textarea"
                        onChange={this.handleChangeText}
                        placeholder="Введите текст..."/>
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleClose}>Отмена</Button>
                <Button onClick={() => this.props.editNote(this.getNote())}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    }
}*/

/*[
    {
        Id: 0,
        CatalogId: 1,
        Header: '',
        IsImportant: false,
        DateOfCreation: '2012-12-1',
        DateOfEditing: null,
        Text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
        'Donec laoreet efficitur quam, at fermentum augue eleifend auctor. ' +
        'Nulla commodo mauris sit amet purus rhoncus ultrices. '
    },
    {
        Id: 1,
        CatalogId: 1,
        Header: '',
        IsImportant: true,
        DateOfCreation: '2012-12-1',
        DateOfEditing: null,
        Text: 'Добрый день.'
    }
]*/
class NotesController extends Component {
    constructor(props) {
        super(props)
        console.log('WOW CONSTRUCTOR')
        this.state = {
            showModal: false,
        }
        this.addNoteHandleSubmit = this.addNoteHandleSubmit.bind(this);
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal(noteId) {
        this.props.getCurrentNote(noteId)
        this.setState({
            showModal: true
        })
    }

    closeModal() {
        this.props.clearCurrentNote()
        this.setState({
            showModal: false
        })
    }

    importantExists() {
        let exists = false
        this.props.notes && this.props.notes.forEach((note) => {
            if (note.IsImportant) {
                exists = true
            }
        })
        return exists
    }

    isEverythingImportant() {
        let check = true
        this.props.notes && this.props.notes.forEach((note) => {
            if (!note.IsImportant) {
                check = false
            }
        })
        return check
    }

    addNoteHandleSubmit(values) {
        let body = {
            id: 0,
            idCreator: 1,//this.props.currentUser.profile.Id
            IsImportant: values.IsImportant,
            DateOfCreation: moment(),
            DateOfChange: null,
            HeaderText: values.HeaderText,
            NoteText: values.NoteText
        }
        console.log('SUBMIT BODY', body)
        this.props.postNote(body)
    }

  /*  componentWillReceiveProps(prevProps){
        if(prevProps.notes.items !== this.props.notes.items){
            console.log('DID UPDATE', this.props.notes.items)
            this.props.fetchNotes()
        }
    }*/

    componentDidMount() {
        this.props.fetchNotes()
    }

    render() {

        const {handleSubmit, pristine, reset, submitting} = this.props
        return <Col xs={12}>
            <Row>
                <form onSubmit={this.props.handleSubmit(this.addNoteHandleSubmit)}>
                    <Panel id="collapsible-panel-example-2" defaultExpanded>
                        <Panel.Heading style={{backgroundColor: 'white'}}>
                            <Panel.Title toggle>
                                Создать заметку
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Collapse>
                            <Panel.Body>
                                {noteFields()}
                            </Panel.Body>
                            <Panel.Footer style={{textAlign: 'right', backgroundColor: 'white'}}>
                                <Button type="button" disabled={pristine || submitting} onClick={reset}>
                                    Очистить
                                </Button>
                                <Button style={{marginRight: '5px'}} type="submit" disabled={pristine || submitting}>
                                    Сохранить
                                </Button>
                                {/*<Button style={{marginRight: '5px'}} onClick={this.clearNote}>Очистить</Button>
                                <Button onClick={this.addNote}>Сохранить</Button>*/}
                            </Panel.Footer>
                        </Panel.Collapse>
                    </Panel>
                </form>
            </Row>
            {/*<CSSTransition
                timeout={300}
              classNames="example"
              unmountOnExit
              >*/}
            {(this.importantExists()) && <Row>
                <ControlLabel>Важные</ControlLabel>
                <div>
                    {this.props.notes && this.props.notes.map((note, key) => {
                        if (note.IsImportant) {
                            let previewText = (note.NoteText.length > 50) ? note.NoteText.substr(0, 48) + '...' : note.NoteText
                            return <div key={key}
                                        className="note-important">
                                <div onClick={() => this.openModal(note.id)}
                                     ref={this.noteClick}>
                                    {previewText}
                                </div>
                                <Glyphicon
                                    glyph="paperclip"
                                    bsSize="large"
                                    className="paperclip"
                                    onClick={() => this.setIsImportant(note.id)}/>
                            </div>
                        }
                    })}
                </div>
            </Row>}
            {/*</CSSTransition>*/}
            <Row>
                {!this.isEverythingImportant() &&
                <div>
                    <ControlLabel>Все заметки</ControlLabel>
                    {/*<CSSTransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>*/}
                    <div>
                        {this.props.notes && this.props.notes.map((note, key) => {
                            if (!note.IsImportant) {
                                let previewText = (note.NoteText.length > 50) ? note.NoteText.substr(0, 48) + '...' : note.NoteText
                                return <div key={key}
                                            className="note">
                                    <div onClick={() => this.openModal(note.id)}>
                                        {previewText}
                                    </div>
                                    <Glyphicon glyph="paperclip" bsSize="large"
                                               onClick={() => this.setIsImportant(note.id)}
                                               className="paperclip"/>
                                </div>
                            }
                        })}
                    </div>
                    {/*</CSSTransitionGroup>*/}
                </div>
                }
            </Row>
            <NoteModal
                showModal={this.state.showModal}
                modalCloseHandler={this.closeModal}
                size="large"
            />
        </Col>
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchNotes,
        getCurrentNote,
        clearCurrentNote,
        postNote
    }, dispatch)
}

function mapStateToProps(state) {
    return {
        notes: state.notes.items
    }
}

NotesController = reduxForm({
    // a unique name for the form
    form: 'createNoteForm'
})(NotesController)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotesController))