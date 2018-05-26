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

const popover = (doc, deleteDocument, moveDocument, moveOptions, higherLevelFolder) => {
    console.log('moveOptions', moveOptions)
    return <Popover id="popover-positioned-scrolling-right" style={{width: '500px'}}>
        <ControlLabel>Название:</ControlLabel>
        <div>{doc.Name}</div>
        <ControlLabel>Тип:</ControlLabel>
        <div>{doc.Type}</div>
        <ControlLabel>Дата создания:</ControlLabel>
        <div>{doc.DateOfCreation}</div>
        <ControlLabel>Переместить:</ControlLabel>
        <ListGroup>
            {doc.idFolder && <ListGroupItem
                bsStyle="info"
                onClick={() => moveDocument(doc, higherLevelFolder)}
            >
                <Glyphicon
                    glyph="triangle-left"
                    bsSize="small"
                />
                На уровень выше
            </ListGroupItem>}
            {(moveOptions.length !== 0) && moveOptions.map((option, key) => {
                return <ListGroupItem
                    key={key}
                    onClick={() => moveDocument(doc, option.id)}
                >
                    {option.Name}
                </ListGroupItem>
            })}
        </ListGroup>
        <hr style={{margin: '10px 0'}}/>
        <div style={{textAlign: 'center'}}>
            <Button
                bsStyle='danger'
                onClick={() => deleteDocument(doc.id)}
            >
                Удалить
            </Button>
        </div>
    </Popover>
};

export default class DocumentItem extends Component {

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
                return 'https://upload.wikimedia.org/wikipedia/commons/8/86/Word_2013_Icon.PNG';
            case 'png' :
                return doc.URL
        }
    }

    render() {
        let doc = this.props.document
        let previewText = (doc.Name && ((doc.Name.length > 16) ? doc.Name.substr(0, 13) + '...' : doc.Name))
        return <div className="document">
            <div onClick={() => this.props.openModal(doc)}>
                <img src={this.getPreviewImage(doc)} width="110px" height="110px" style={{marginTop: '20px'}}/>
                <div style={{position: 'absolute', bottom: '0', textAlign: 'center'}}>{previewText}</div>
            </div>
            <OverlayTrigger
            container={this}
            trigger="click"
            rootClose
            placement="bottom"
            overlay={popover(doc, this.props.deleteDocument, this.props.moveDocument, this.props.moveOptions, this.props.higherLevelFolder)}
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
