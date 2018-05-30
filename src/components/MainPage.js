import React, {Component} from 'react';
import {
    Col,
    Row,
} from 'react-bootstrap'
import '../styles/MainPage.css'
import {Route, Link} from "react-router-dom";
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Sidebar from './Sidebar'
import Preloader from './common/Preloader'

class MainPage extends Component {

    render() {
        let className = (this.props.location.pathname === '/profile') ? 'items-background-profile' : 'items-background'
        return <Preloader isLoading={this.props.auth.isFetching}>
        <Col xs={12}>
            <Row>
                <Col xs={12}>
                    <Row>
                        <Sidebar/>
                    </Row>
                </Col>
                <Col xs={12}>
                    <Row className={className}>
                        {this.props.routes.map((route, i) => <Route
                            key={i}
                            path={route.path}
                            component={route.component}
                        />)}
                    </Row>
                </Col>
            </Row>
        </Col>
        </Preloader>
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps)(MainPage))