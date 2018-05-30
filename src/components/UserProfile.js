import React, {Component} from 'react';
import {
    Fade,
    Col,
    Row,
    Button,
    Glyphicon,
    ControlLabel,
    Panel
} from 'react-bootstrap'
import '../styles/profile.css'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Preloader from './common/Preloader'

class UserProfile extends Component {

    render() {

        let {currentUser} = this.props

        let userPic = currentUser.ImageURL ? currentUser.ImageURL : 'http://marketline.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'

        return <Preloader isLoading={this.props.auth.isFetching}>
            <Col xs={12} className="profile">
                <Row>
                    <Panel id="collapsible-panel-example-2">
                        <Panel.Heading style={{backgroundColor: 'white', textAlign: 'center'}}>
                            <Panel.Title toggle>
                                Профіль користувача
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            {currentUser &&
                            <Col xs={12}>
                                <Row>
                                    <Col xs={12} sm={4}>
                                        <Row>
                                            <img src={userPic} className="userPic" width="100px" height='100px'/>
                                        </Row>
                                    </Col>
                                    <Col xs={12} sm={8}>
                                        <Row>
                                            <div>
                                                <ControlLabel>Логін: {currentUser.Login}</ControlLabel>
                                            </div>
                                            <div>
                                                <ControlLabel>E-mail: {currentUser.Email}</ControlLabel>
                                            </div>
                                            <div>
                                                <ControlLabel>Ім'я: {currentUser.Name}</ControlLabel>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            }
                        </Panel.Body>
                    </Panel>
                </Row>
            </Col>
        </Preloader>
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        currentUser: state.auth.currentUser
    }
}

export default withRouter(connect(mapStateToProps)(UserProfile))