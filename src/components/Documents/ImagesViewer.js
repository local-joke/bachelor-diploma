import React, {Component} from 'react';
import {render} from 'react-dom';
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
import {deleteDocument} from "../../redux/actions/documents"
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    //non-api
    setCurrentFile,
    clearCurrentFile,
} from "../../redux/actions/files"
import {deleteMethod} from "../../api/index"

const popover = (image, deleteImage) => (
    <Popover id="popover-positioned-scrolling-right">
        {/*<ControlLabel>Название:</ControlLabel>
        <div>{image.Name}</div>
        <ControlLabel>Тип:</ControlLabel>
        <div>{image.Type}</div>
        <ControlLabel>Дата создания:</ControlLabel>
        <div>{image.DateOfCreation}</div>
        <hr style={{margin: '10px 0'}}/>*/}
        <div>
            <Button
                bsStyle='danger'
                onClick={() => deleteImage(image.image_id)}
            >
                Удалить
            </Button>
        </div>
    </Popover>
);

class Image extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showOverlay: false
        }

        this.openOverlay = this.openOverlay.bind(this)
    }

    openOverlay() {
        this.setState({
            showOverlay: true
        })
    }

    render() {
        let index = this.props.index
        let photo = this.props.photo
        return <div className="imageContainer">
            <div
                onClick={(e) => this.props.onPictureClick(e, this.props.index)}
            >
                <img src={photo.src} width="200px" height="200px"/>
            </div>
            <OverlayTrigger
                container={this}
                trigger="click"
                rootClose
                placement="bottom"
                overlay={popover(photo, (id) => this.props.deleteImage(id))}
            >
                <Glyphicon
                    glyph="option-horizontal"
                    bsSize="large"
                    className="imageInfo"
                    onClick={this.openOverlay}
                />
            </OverlayTrigger>
        </div>
    }
}

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
        this.deleteImage = this.deleteImage.bind(this)
    }

    openOverlay() {
        this.setState({
            showOverlay: true
        })
    }

    openLightbox(event, index) {
        console.log('LIGHTBOX', index)
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
        this.props.documents && this.props.documents.forEach((doc) => {
            if ((doc.Type === 'png') || (doc.Type === 'jpg')) {
                images.push({
                    src: doc.URL,
                    width: 1,
                    height: 1,
                    image_id: doc.id
                })
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

    deleteImage(id){
        console.log('DELETE',id)
        //this.props.deleteMethod(deleteDocument, id)
    }

    componentWillUnmount(){
        this.props.clearCurrentFile()
    }

    render() {
        return (
            <div>
                <Gallery
                    photos={this.getImages()}
                    ImageComponent={({ index, onClick, photo, margin }) => <Image
                        index={index}
                        photo={photo}
                        onPictureClick={this.openLightbox}
                        deleteImage={this.deleteImage}
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
        documents: state.documents.items
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImagesViewer))