import React, {Component} from 'react';
import {
    Fade,
    Col,
    Row,
    Button,
    Glyphicon,
    ControlLabel,
    Panel
} from 'react-bootstrap'
import '../../styles/notes.css'
import moment from 'moment'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
    //api
    getNotes,
    addNote,
    editNote,
    deleteNote,
    //non-api
    setCurrentNote,
    clearCurrentNote,
} from '../../redux/actions/notes'
import {getMethod, postMethod, deleteMethod, putMethod} from '../../api/index'
import {withRouter} from 'react-router-dom'
import {reduxForm} from 'redux-form'
import {noteFields} from "./noteFields"
import NoteModal from './NoteModal'
import {getCurrentDate} from '../../redux/helpers'

import {CSSTransition} from 'react-transition-group'

const Note = (props) => {
    const {previewText, openModal, setIsImportant, note, className} = props

    let isImportant = (note.IsImportant === 1)

    return <Fade in>
        <div className={className}>
            <div onClick={() => openModal(note.id)}>
                {previewText}
            </div>
            <Glyphicon
                glyph="paperclip"
                bsSize="large"
                className="paperclip"
                onClick={() => setIsImportant(note, !isImportant)}/>
        </div>
    </Fade>
}

class NotesController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
        }
        this.addNoteHandleSubmit = this.addNoteHandleSubmit.bind(this);
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.setIsImportant = this.setIsImportant.bind(this)
        this.renderNotes = this.renderNotes.bind(this)
    }

    openModal(noteId) {
        this.props.setCurrentNote(noteId)
        this.setState({
            showModal: true
        })
    }

    setIsImportant(note, isImportant) {
        let body = {
            id: note.id,
            idCreator: this.props.auth.currentUser.id,
            IsImportant: isImportant ? 1 : 0,
            DateOfCreation: note.DateOfCreation,
            DateOfChange: getCurrentDate(),
            HeaderText: note.HeaderText,
            NoteText: note.NoteText
        }
        this.props.putMethod(editNote, body)
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
            idCreator: this.props.auth.currentUser.id,
            IsImportant: values.IsImportant ? 1 : 0,
            DateOfCreation: getCurrentDate(),
            DateOfChange: null,
            HeaderText: values.HeaderText,
            NoteText: values.NoteText
        }
        console.log('SUBMIT BODY', body)
        this.props.postMethod(addNote, body)
        this.props.reset()
    }

    componentDidMount() {
        this.props.getMethod(getNotes, this.props.auth.currentUser.id)
    }

    renderNotes(isImportant) {
        this.props.notes && this.props.notes.map((note, key) => {
            if (note.IsImportant === isImportant) {
                let previewText = (note.NoteText.length > 50) ? note.NoteText.substr(0, 48) + '...' : note.NoteText
                let className = note.IsImportant ? 'note-important' : 'note'
                return <Fade appear>
                    <Note
                        key={key}
                        previewText={previewText}
                        openModal={this.openModal}
                        note={note}
                        className={className}
                        setIsImportant={this.setIsImportant}
                    />
                </Fade>
            }
        })
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
                                <Button
                                    style={{marginRight: '5px'}}
                                    type="button"
                                    disabled={pristine || submitting}
                                    onClick={reset}
                                    bsStyle="default">
                                    Очистить
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={pristine || submitting}
                                    bsStyle="success">
                                    Сохранить
                                </Button>
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
                            let className = note.IsImportant ? 'note-important' : 'note'
                            return <Note
                                key={key}
                                previewText={previewText}
                                openModal={this.openModal}
                                note={note}
                                className={className}
                                setIsImportant={this.setIsImportant}
                            />
                        }
                    })}
                </div>
            </Row>}
            {/* </CSSTransition>*/}
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
                                let className = note.IsImportant ? 'note-important' : 'note'
                                return <Note
                                    key={key}
                                    previewText={previewText}
                                    openModal={this.openModal}
                                    note={note}
                                    className={className}
                                    setIsImportant={this.setIsImportant}
                                />
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
        getMethod,
        postMethod,
        deleteMethod,
        putMethod,
        setCurrentNote,
        clearCurrentNote,
    }, dispatch)
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        notes: state.notes.items
    }
}

NotesController = reduxForm({
    // a unique name for the form
    form: 'createNoteForm'
})(NotesController)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotesController))