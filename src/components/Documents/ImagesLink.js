import React, {Component} from 'react';
import DocumentsController from './DocumentsController'

export default class ImagesLink extends Component {
    render(){
        return <DocumentsController
            imagesMode={true}
        />
    }
}