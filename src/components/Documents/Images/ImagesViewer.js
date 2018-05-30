import React, {Component} from 'react';
import {
    Col,
    Row,
    Button,
    Modal,
    Popover,
    Glyphicon,
    OverlayTrigger,
    ControlLabel,
    Panel
} from 'react-bootstrap'
import {deleteDocument} from "../../../redux/actions/documents"
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    //non-api
    setCurrentFile,
    clearCurrentFile,
} from "../../../redux/actions/files"
import {deleteMethod} from "../../../api/index"
import Drop from '../Drop'
import Image from './Image'

class ImagesViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lightboxIsOpen: false,
            showOverlay: false
        }
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.openOverlay = this.openOverlay.bind(this)
    }

    openOverlay() {
        this.setState({
            showOverlay: true
        })
    }

    openLightbox(event, index) {
        this.props.setCurrentFile(index)
        this.setState({
            lightboxIsOpen: true
        })
    }

    closeLightbox() {
        this.setState({
            lightboxIsOpen: false
        })
        //this.props.clearCurrentFile()
    }

    getImages() {
        let images = [];
        this.props.documents.items && this.props.documents.items.forEach((doc) => {
            if (doc.idFolder === this.props.currentFolder) {
                if ((doc.Type === 'png') || (doc.Type === 'jpg')) {
                    images.push({
                        src: doc.URL,
                        width: 1,
                        height: 1,
                        image: doc
                    })
                }
            }
        })
        return images
    }

    gotoPrevious() {
        this.props.setCurrentFile(this.props.currentFile.file - 1)
    }

    gotoNext() {
        this.props.setCurrentFile(this.props.currentFile.file + 1)
    }

    componentWillUnmount(){
        this.props.clearCurrentFile()
    }

    render() {

        let {
            documents,
            onDrop,
            clearDrop,
            addImageHandler,
            droppedFile,
            deleteImage,
            moveOptions,
            moveImage,
            higherLevelFolder
        } = this.props

        return (
            <div>
                <Drop
                    isLoading={documents.isAdding}
                    onDrop={onDrop}
                    droppedFile={droppedFile}
                    clearDrop={clearDrop}
                    accept='.png,.jpg,.jpeg'
                    addDocumentHandler={addImageHandler}
                    className='imageDropzoneContainer'
                    dropzoneClassName="imageDropzone"
                />
                <Gallery
                    photos={this.getImages()}
                    ImageComponent={({ index, onClick, photo, margin }) => <Image
                        index={index}
                        photo={photo}
                        onPictureClick={this.openLightbox}
                        deleteImage={deleteImage}
                        moveOptions={moveOptions}
                        moveImage={moveImage}
                        higherLevelFolder={higherLevelFolder}
                    />}
                />
                <Lightbox images={this.getImages()}
                          onClose={this.closeLightbox}
                          onClickPrev={this.gotoPrevious}
                          onClickNext={this.gotoNext}
                          currentImage={this.props.currentFile.file}
                          isOpen={this.state.lightboxIsOpen}
                />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setCurrentFile,
        clearCurrentFile,
        deleteMethod
    }, dispatch)
}

function mapStateToProps(state) {
    return {
        currentFile: state.currentFile,
        currentFolder:  state.folders.currentFolder ? state.folders.currentFolder.id : 0,
        documents: state.documents
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImagesViewer))