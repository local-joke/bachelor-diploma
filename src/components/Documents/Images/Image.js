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
import popover from '../popover'

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
        let {
            index,
            photo,
            onPictureClick,
            deleteImage,
            moveImage,
            moveOptions,
            higherLevelFolder
        } = this.props

        let imagesMode = true

        return <div className="imageContainer">
            <div
                onClick={(e) => onPictureClick(e, this.props.index)}
            >
                <img src={photo.src} width="150px" height="150px"/>
            </div>
            <OverlayTrigger
                container={this}
                trigger="click"
                rootClose
                placement="bottom"
                overlay={popover(photo.image, deleteImage, moveImage, moveOptions, higherLevelFolder, imagesMode)}
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

export default Image