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
    Modal,
    FormGroup,
    FormControl,
    FieldGroup,
    Panel,
    ControlLabel
} from 'react-bootstrap'
import '../styles/notes.css'

class NoteModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noteHeader: '',
            noteText: '',
            show: false
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow(note) {
        this.setState({
            show: true,
            noteHeader: note.Header,
            noteText: note.Text,
        });
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
                        placeholder="Введите название..."/>
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Текст</ControlLabel>
                    <FormControl
                        style={{height: '270px'}}
                        type="text"
                        value={this.state.noteText}
                        placeholder="Введите текст..."/>
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleClose}>Отмена</Button>
                <Button onClick={this.handleClose}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    }
}

export default class NotesController extends Component {
    constructor(props) {
        super(props)
        console.log('WOW CONSTRUCTOR')
        this.state = {
            idCounter: 2,
            notes: [
                {
                    Id: 0,
                    CatalogId: 0,
                    Header: '',
                    Date: '2012-12-1',
                    Text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                    'Donec laoreet efficitur quam, at fermentum augue eleifend auctor. ' +
                    'Nulla commodo mauris sit amet purus rhoncus ultrices. '
                },
                {
                    Id: 1,
                    CatalogId: 0,
                    Header: '',
                    Date: '2012-12-1',
                    Text: 'лох'
                }
            ]
        }
        this.addNote = this.addNote.bind(this);
        this.clearNote = this.clearNote.bind(this)
    }

    addNote() {
        console.log('ADD NOTE', this.noteHeader, this.noteText.value)
        let newNote = {
            Id: this.state.idCounter,
            Header: this.noteHeader.value,
            Text: this.noteText.value,
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

    clearNote() {
        this.noteHeader.value = ''
        this.noteText.value = ''
    }

    openModal(note) {
        this.notesModal.handleShow(note)
    }

    render() {

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
                        </Panel.Body>
                        <Panel.Footer style={{textAlign: 'right', backgroundColor: 'white'}}>
                            <Button style={{marginRight: '5px'}} onClick={this.clearNote}>Очистить</Button>
                            <Button onClick={this.addNote}>Сохранить</Button>
                        </Panel.Footer>
                    </Panel.Collapse>
                </Panel>
            </Row>
            <Row>
                {this.state.notes.map((note, key) => {
                    let previewText = (note.Text.length > 40) ? note.Text.substr(0, 38) + '...' : note.Text
                    return <div key={key} className="note" onClick={() => this.openModal(note)}>
                        {previewText}
                    </div>
                })}
            </Row>
            <NoteModal
                size="large"
                ref={c => this.notesModal = c}
            />
        </Col>
    }
}