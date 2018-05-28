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
import {bindActionCreators} from 'redux'
import {
    //api
    signOut
} from '../redux/actions/auth'
import Preloader from './common/Preloader'

class UserProfile extends Component {
    render() {

        let {currentUser} = this.props

        return <Preloader isLoading={this.props.auth.isFetching}>
            <Col xs={12}>
                <Row>
                    <Panel id="collapsible-panel-example-2">
                        <Panel.Heading style={{backgroundColor: 'white'}}>
                            <Panel.Title toggle>
                                Профіль користувача
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            {currentUser && <div className="userPic">
                                <img src={currentUser.ImageURL} ></img>
                            </div>}
                        </Panel.Body>
                        <Panel.Footer style={{textAlign: 'right', backgroundColor: 'white'}}>
                            <Button
                                type="submit"
                                bsStyle="danger">
                                Вийти
                            </Button>
                        </Panel.Footer>
                    </Panel>
                </Row>
            </Col>
        </Preloader>
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signOut
    }, dispatch)
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        currentUser: state.auth.currentUser
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile))