import React, {Component} from 'react';
import {
    Modal
} from 'react-bootstrap'
import '../../styles/notes.css'
import {connect} from 'react-redux'
import FileViewer from 'react-file-viewer'
import {ReactReader} from 'react-reader'
import PDFViewer from '../common/PDFViewer'

const acceptedTypes = ['docx', 'png', 'jpeg', 'jpg']

const renderComponent = (file) => {
    if (file.hasOwnProperty('Type')) {
        let checkType = false
        acceptedTypes.forEach(type => {
            if(type === file.Type){
                checkType = true
            }
        })
        if (checkType) {
            console.log('FILE', file)
            return <FileViewer
                fileType={file.Type}
                filePath={file.URL}
            />
        }
        else if(file.Type === 'pdf'){

            return <PDFViewer
                file={file.URL}
            />
        }
        else return <h3>Вибачте, Формат файлу не підтримується</h3>
    }
    else if (file.hasOwnProperty('Title')) {
        return <ReactReader
            url={file.URL}
            title={file.Title}
            locationChanged={(epubcifi) => console.log(epubcifi)}
        />
    }
}

class FileViewModal extends Component {

    render() {
        return <Modal show={this.props.show} size={this.props.size} onHide={() => this.props.modalCloseHandler()}>
            <Modal.Body style={{height: '900px'}}>
                <div style={{position: 'relative', height: '100%'}}>
                    {this.props.currentFile.file && renderComponent(this.props.currentFile.file)}
                </div>
            </Modal.Body>
        </Modal>
    }
}

function mapStateToProps(state) {
    return {
        currentFile: state.currentFile
    }
}

export default connect(mapStateToProps)(FileViewModal)