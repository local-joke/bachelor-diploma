import React, {Component} from 'react';
import DocumentsController from './DocumentsController'

export default class ImagesController extends Component {
    render(){
        return <DocumentsController
            imagesMode={true}
        />
    }
}