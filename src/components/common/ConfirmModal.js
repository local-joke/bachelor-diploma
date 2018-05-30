import React, {Component} from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap'
import '../../styles/notes.css'

const ConfirmModal = (props) => {

    let {
        modalCloseHandler,
        show,
        modalSubmitHandler,
        itemToDeleteId
    } = props

    return <Modal show={show} size='small' onHide={modalCloseHandler}>
        <Modal.Body><h3>Ви впевнені?</h3></Modal.Body>
        <Modal.Footer>
            <Button
                type="button"
                bsStyle='default'
                onClick={modalCloseHandler}
            >
                Ні
            </Button>
            <Button
                type="submit"
                bsStyle='success'
                onClick={() => modalSubmitHandler(itemToDeleteId)}
            >
                Так
            </Button>
        </Modal.Footer>
    </Modal>

}

export default ConfirmModal