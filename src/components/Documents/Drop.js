import React from 'react'
import Preloader from '../common/Preloader'
import Dropzone from 'react-dropzone'
import {
    Button,
    Glyphicon
} from 'react-bootstrap'

const Drop = props => {

    let {isLoading, onDrop, accept, className, dropzoneClassName, clearDrop, addDocumentHandler, droppedFile} = props

    return <div className={className}>
        <Preloader isLoading={isLoading}>
            <Dropzone
                className={dropzoneClassName}
                onDrop={onDrop}
                accept={accept}
                multiple={false}>
                {droppedFile ?
                    <li>
                        {((droppedFile.name.length > 16) ?
                            droppedFile.name.substr(0, 13) + '...'
                            : droppedFile.name)}
                    </li> : <h5>Перетягніть файл сюди або натисніть, щоб вибрати ({accept})</h5>
                }
            </Dropzone>
            <div className="dropzoneButtonsContainer">
                <Button
                    style={{marginRight: '5px'}}
                    type="button"
                    bsStyle="default"
                    disabled={!droppedFile}
                    onClick={clearDrop}
                >
                    <Glyphicon
                        glyph="remove"
                        bsSize="large"
                    />
                </Button>
                <Button
                    type="submit"
                    bsStyle="success"
                    disabled={!droppedFile}
                    onClick={addDocumentHandler}
                >
                    <Glyphicon
                        glyph="ok"
                        bsSize="large"
                    />
                </Button>
            </div>
        </Preloader>
    </div>
}

export default Drop