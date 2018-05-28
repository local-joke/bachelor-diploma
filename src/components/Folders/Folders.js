import React, {Component} from 'react';
import {
    Fade,
    Col,
    Row,
    FormControl,
    FormGroup,
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
    getFolders,
    addFolder,
    deleteFolder,
    //non-api
    setCurrentFolder,
    clearCurrentFolder,
    setEditingFolder,
    clearEditingFolder, editFolder
} from '../../redux/actions/folders'
import {getMethod, postMethod, deleteMethod, putMethod} from '../../api/index'
import {formInput} from "../common/FormFields"
import {withRouter} from 'react-router-dom'
import {reduxForm, Field} from 'redux-form'
import {getCurrentDate} from '../../redux/helpers'
import Folder from './Folder'
import FolderModal from './FolderModal'
import Preloader from '../common/Preloader'

class Folders extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            currentPath: ''
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.createFolder = this.createFolder.bind(this)
        this.setCurrentFolder = this.setCurrentFolder.bind(this)
        this.goBack = this.goBack.bind(this)
        this.deleteFolder = this.deleteFolder.bind(this)
        this.moveFolder = this.moveFolder.bind(this)
    }

    createFolder() {
        if (this.folderName.value && this.folderName.value.length < 45) {
            let body = {
                idCreator: this.props.auth.currentUser.id,
                idParentFolder: this.props.folders.currentFolder ? this.props.folders.currentFolder.id : 0,
                DateOfCreation: getCurrentDate(),
                DateOfChange: null,
                Name: this.folderName.value,
            }
            this.props.postMethod(addFolder, body)
            this.folderName.value = ''
        }
        else {
            alert("У папки занадто довга назва!")
        }
    }

    deleteFolder(id) {
        this.props.deleteMethod(deleteFolder, id)
    }

    moveFolder(folder, destinationFolderId) {
        let body = {
            id: folder.id,
            idCreator: this.props.auth.currentUser.id,
            idParentFolder: destinationFolderId,
            DateOfCreation: folder.DateOfCreation,
            DateOfChange: getCurrentDate(),
            Name: folder.Name
        }
        this.props.putMethod(editFolder, body)
    }

    getMoveOptions(folderId) {
        let currentFolderId = this.props.folders.currentFolder ? this.props.folders.currentFolder.id : 0
        return this.props.folders.items.filter(folder => {
            return ((folder.idParentFolder === currentFolderId) && (folderId !== folder.id))
        })
    }

    setCurrentFolder(folder) {
        this.props.setCurrentFolder(folder)
        this.setState({
            currentPath: this.state.currentPath + '/' + folder.Name
        })
    }

    goBack() {
        let parentFolder = this.props.folders.items && this.props.folders.items.filter(folder => {
            return folder.id === this.props.folders.currentFolder.idParentFolder
        })
        this.props.setCurrentFolder(parentFolder[0])
        this.setState({
            currentPath: this.state.currentPath.slice(0, this.state.currentPath.lastIndexOf('/'))
        })
    }

    openModal(folderId) {
        this.props.setEditingFolder(folderId)
        this.setState({
            showModal: true
        })
    }

    closeModal() {
        this.props.clearEditingFolder()
        this.setState({
            showModal: false
        })
    }

    componentDidMount() {
        this.props.auth.currentUser.id && this.props.getMethod(getFolders, this.props.auth.currentUser.id)
    }

    componentWillUnmount() {
        this.props.clearCurrentFolder()
    }

    render() {
        return <Preloader isLoading={this.props.folders.isFetching}>
            <Col xs={12}>
                <Row>
                    <ControlLabel>Папки: {this.state.currentPath}</ControlLabel>
                    <div>
                        {this.props.folders.currentFolder &&
                        <div
                            className="folderBackButton"
                            onClick={this.goBack}
                        >
                            <Glyphicon
                                glyph="triangle-left"
                                bsSize="large"
                            />
                        </div>}
                        <div className="emptyFolderContainer">
                            <div className='emptyIconContainer'>
                                <Glyphicon
                                    glyph="folder-open"
                                    bsSize="large"
                                    onClick={this.createFolder}
                                />
                            </div>
                            <FormGroup bsSize='small'>
                                <FormControl
                                    inputRef={(c) => this.folderName = (c)}
                                    placeholder='Назва'
                                />
                            </FormGroup>
                        </div>
                        {this.props.folders.items && this.props.folders.items.map((item, key) => {
                            if (item.idParentFolder === (this.props.folders.currentFolder ? this.props.folders.currentFolder.id : 0))
                                return <Folder
                                    key={key}
                                    folder={item}
                                    onClick={this.setCurrentFolder}
                                    openModal={this.openModal}
                                    deleteFolder={this.deleteFolder}
                                    moveOptions={this.getMoveOptions(item.id)}
                                    moveFolder={this.moveFolder}
                                    higherLevelFolder={this.props.folders.currentFolder && this.props.folders.currentFolder.idParentFolder}
                                />
                        })}
                    </div>
                </Row>
                <FolderModal
                    showModal={this.state.showModal}
                    modalCloseHandler={this.closeModal}
                    size="small"
                />
            </Col>
        </Preloader>
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setCurrentFolder,
        clearCurrentFolder,
        setEditingFolder,
        clearEditingFolder,
        getMethod,
        postMethod,
        deleteMethod,
        putMethod
    }, dispatch)
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        folders: state.folders,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Folders)