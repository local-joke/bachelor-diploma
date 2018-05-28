import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    Col,
    Row,
    Button,
    Modal,
    Popover,
    Glyphicon,
    OverlayTrigger,
    ControlLabel,
    ListGroup,
    ListGroupItem,
    Panel
} from 'react-bootstrap'
import '../../styles/notes.css'
import popover from './popover'

export default class Document extends Component {

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

    getPreviewImage(doc) {
        switch (doc.Type) {
            case 'docx':
                return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Word_2013_file_icon.svg/2000px-Word_2013_file_icon.svg.png';
            case 'pdf':
                return 'https://www.e-disti.com/wp-content/uploads/2017/11/pdf_icon_svg_by_qubodup-d9n1mhy.png'
            case 'png' :
                return doc.URL
            case 'jpg' :
                return doc.URL
        }
    }

    render() {
        let {
            doc,
            deleteDocument,
            moveDocument,
            moveOptions,
            higherLevelFolder,
            openModal
        } = this.props

        let imagesMode = false

        console.log('render doc', doc)

        let previewText = (doc.Name && ((doc.Name.length > 16) ? doc.Name.substr(0, 13) + '...' : doc.Name))

        return <div className="document">
            <div onClick={() => openModal(doc)}>
                <img src={this.getPreviewImage(doc)} width="110px" height="110px" style={{marginTop: '20px'}}/>
                <div style={{position: 'absolute', bottom: '0', textAlign: 'center'}}>{previewText}</div>
            </div>
            <OverlayTrigger
            container={this}
            trigger="click"
            rootClose
            placement="bottom"
            overlay={popover(doc, deleteDocument, moveDocument, moveOptions, higherLevelFolder, imagesMode)}
        >
            <Glyphicon
                glyph="option-horizontal"
                bsSize="large"
                className="paperclip"
                onClick={this.openOverlay}
            />
        </OverlayTrigger>
        </div>
    }
}
