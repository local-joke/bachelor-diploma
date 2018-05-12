import React, {Component} from 'react';
import {
    Modal
} from 'react-bootstrap'
import '../../styles/notes.css'
import {connect} from 'react-redux'
import FileViewer from 'react-file-viewer'
import {ReactReader} from 'react-reader'

const renderComponent = (file) => {
    console.log('FILE', file)
    if (file.hasOwnProperty('Type')) {
        switch (file.Type) {
            case 'docx':
                return <FileViewer
                    fileType={file.Type}
                    filePath={file.URL}
                />
            case 'pdf':
                return <div></div>
        }
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