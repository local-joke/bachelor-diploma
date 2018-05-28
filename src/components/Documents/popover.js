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
    ListGroup,
    ListGroupItem,
    Panel
} from 'react-bootstrap'
import '../../styles/notes.css'

const popover = (doc, deleteDocument, moveDocument, moveOptions, higherLevelFolder, imagesMode) => {
    console.log('moveOptions', moveOptions)
    return <Popover id="popover-positioned-scrolling-right" style={{width: '500px'}}>
        {!imagesMode && <div><ControlLabel>Название:</ControlLabel>
            <div>{doc.Name}</div>
            <ControlLabel>Тип:</ControlLabel>
            <div>{doc.Type}</div>
            <ControlLabel>Дата создания:</ControlLabel>
            <div>{doc.DateOfCreation}</div>
        </div>
        }
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
                style={{marginRight: '5px'}}
                onClick={() => deleteDocument(doc.id)}
            >
                Удалить
            </Button>
            <Button
                bsStyle='primary'
                onClick={() =>  document.location.href = doc.URL}
            >
                Завантажити
            </Button>
        </div>
    </Popover>
};

export default popover