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
import '../styles/notes.css'
import moment from 'moment'
import axios from 'axios'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchNotes } from '../redux/actions/index'


//import {CSSTransitionGroup} from 'react-transition-group'

class NoteModal extends Component {
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
}
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
            idCounter: 2,
            notes: []
        }
        this.addNote = this.addNote.bind(this);
        this.clearNote = this.clearNote.bind(this)
        this.editNote = this.editNote.bind(this)
        this.noteClick = React.createRef();
    }

    setIsImportant(noteId) {
        let notes = this.state.notes
        notes.map((note) => {
            if (note.id === noteId) {
                note.IsImportant = !note.IsImportant
            }
        })
        this.setState({
            notes: notes
        })
    }

    addNote() {
        let newNote = {
            id: this.state.idCounter,
            CatalogId: 1,
            Header: this.noteHeader.value,
            Text: this.noteText.value,
            IsImportant: this.checkbox.value,
            DateOfCreation: moment(),
            DateOfEditing: null,
        }
        let notes = this.state.notes
        notes.push(newNote)
        this.setState({
            idCounter: this.state.idCounter++,
            notes: notes,
        })
        this.noteHeader.value = ''
        this.noteText.value = ''
    }

    editNote(editedNote) {
        this.notesModal.handleClose()
        let notes = this.state.notes
        notes.map((note, i) => {
            if (note.Id === editedNote.Id) {
                notes.splice(i, 1, editedNote)
            }
        })
        this.setState({
            notes: notes
        })
    }

    clearNote() {
        this.noteHeader.value = ''
        this.noteText.value = ''
    }

    openModal(note) {
        this.notesModal.handleShow(note)
    }

    importantExists() {
        let exists = false
        this.props.notes.forEach((note) => {
            if (note.IsImportant) {
                exists = true
            }
        })
        return exists
    }

    isEverythingImportant() {
        let check = true
        this.props.notes.forEach((note) => {
            if (!note.IsImportant) {
                check = false
            }
        })
        return check
    }

    componentDidMount(){
        this.props.fetchNotes()
    }

    render() {
        console.log(this.props.notes)
        return <Col xs={12}>
            <Row>
                <Panel id="collapsible-panel-example-2">
                    <Panel.Heading style={{backgroundColor: 'white'}}>
                        <Panel.Title toggle>
                            Создать заметку
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <FormGroup>
                                <ControlLabel>Название</ControlLabel>
                                <FormControl
                                    id="formControlsText"
                                    type="text"
                                    inputRef={(input) => this.noteHeader = input}
                                    label="Text"
                                    placeholder="Введите название..."/>
                            </FormGroup>
                            <FormGroup controlId="formControlsTextarea">
                                <ControlLabel>Текст</ControlLabel>
                                <FormControl
                                    inputRef={(input) => this.noteText = input}
                                    componentClass="textarea"
                                    placeholder="Введите текст"/>
                            </FormGroup>
                            <Checkbox inputRef={ref => this.checkbox = ref}>
                                Важная
                            </Checkbox>
                        </Panel.Body>
                        <Panel.Footer style={{textAlign: 'right', backgroundColor: 'white'}}>
                            <Button style={{marginRight: '5px'}} onClick={this.clearNote}>Очистить</Button>
                            <Button onClick={this.addNote}>Сохранить</Button>
                        </Panel.Footer>
                    </Panel.Collapse>
                </Panel>
            </Row>
            {/*<CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>*/}
            {(this.importantExists()) && <Row>
                <ControlLabel>Важные</ControlLabel>
                <div>
                    {this.props.notes && this.props.notes.map((note, key) => {
                        if (note.IsImportant) {
                            let previewText = (note.NoteText.length > 50) ? note.NoteText.substr(0, 48) + '...' : note.NoteText
                            return <div key={key}
                                        className="note-important">
                                <div onClick={() => this.openModal(note)}
                                     ref={this.noteClick}>
                                    {previewText}
                                </div>
                                <Glyphicon
                                    glyph="paperclip"
                                    bsSize="large"
                                    className="paperclip"
                                    onClick={() => this.setIsImportant(note.Id)}/>
                            </div>
                        }
                    })}
                </div>
            </Row>}
            {/*</CSSTransitionGroup>*/}
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
                                <div onClick={() => this.openModal(note)}>
                                    {previewText}
                                </div>
                                <Glyphicon glyph="paperclip" bsSize="large"
                                           onClick={() => this.setIsImportant(note.Id)}
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
                editNote={this.editNote}
                size="large"
                ref={c => this.notesModal = c}
            />
        </Col>
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchNotes}, dispatch)
}

function mapStateToProps(state) {
    return {
        notes: state.items
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesController)