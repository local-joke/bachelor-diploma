import React, {Component} from 'react';
import {
    Col,
    Row,
} from 'react-bootstrap'
import '../styles/MainPage.css'
import {Route, Link} from "react-router-dom";
import {withRouter} from 'react-router-dom'
import Sidebar from './Sidebar'

class MainPage extends Component {

    render() {
        return <Col xs={12}>
            <Row>
                <Col xs={12}>
                    <Row>
                        <Sidebar/>
                    </Row>
                </Col>
                <Col xs={12}>
                    <Row className="items-background">
                        {this.props.routes.map((route, i) => <Route
                            key={i}
                            path={route.path}
                            component={route.component}
                        />)}
                    </Row>
                </Col>
            </Row>
        </Col>
    }
}


export default withRouter(MainPage)