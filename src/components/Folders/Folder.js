import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    Col,
    Row,
    Button,
    Modal,
    ListGroup,
    ListGroupItem,
    Popover,
    Glyphicon,
    OverlayTrigger,
    ControlLabel,
    Panel
} from 'react-bootstrap'
import '../../styles/notes.css'

const popover = (folder, moveOptions, deleteFolder, openModal, moveFolder, higherLevelFolder) => (
    <Popover id="popover-positioned-scrolling-right" style={{width: '500px'}}>
        <ControlLabel>Переместить:</ControlLabel>
        <ListGroup>
            {(folder.idParentFolder !== 0 ) && <ListGroupItem
                bsStyle="info"
                onClick={() => moveFolder(folder, higherLevelFolder)}
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
                    onClick={() => moveFolder(folder, option.id)}
                >
                    {option.Name}
                </ListGroupItem>
            })}
        </ListGroup>
        <hr style={{margin: '10px 0'}}/>
        <div style={{textAlign: 'center'}}>
            <Button
                bsStyle='danger'
                style={{marginRight: '5px'}}
                onClick={() => deleteFolder(folder.id)}
            >
                Удалить
            </Button>
            <Button
                bsStyle='primary'
                onClick={() => openModal(folder.id)}
            >
                Переименовать
            </Button>
        </div>
    </Popover>
);

export default class Folder extends Component {

    render() {
        let {folder, moveOptions} = this.props
        return <div className='folder'>
            <div onClick={() => this.props.onClick(folder)}>
                <div className='iconContainer'>
                    <Glyphicon
                        glyph="folder-open"
                        bsSize="large"
                    />
                </div>
                <div className="folderTextContainer">{folder.Name}</div>
            </div>
            <OverlayTrigger
                container={this}
                trigger="click"
                rootClose
                placement="bottom"
                overlay={popover(
                    folder,
                    moveOptions,
                    this.props.deleteFolder,
                    this.props.openModal,
                    this.props.moveFolder,
                    this.props.higherLevelFolder,
                )}
            >
                <Glyphicon
                    glyph="option-horizontal"
                    bsSize="large"
                    className="paperclip"
                    //onClick={this.openOverlay}
                />
            </OverlayTrigger>
        </div>
    }
}