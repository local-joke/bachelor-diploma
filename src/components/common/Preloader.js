import React from 'react';
import {ClipLoader} from 'react-spinners'
import {
    Col
} from 'react-bootstrap'

const Preloader = (props) => {

    let {isLoading, children} = props

    const style = {
        textAlign: 'center',
        marginTop: '25%'
    }

    if(isLoading) return <Col xs={12} style={style}>
        <ClipLoader loading={true}/>
    </Col>

    else return children
}

export default Preloader