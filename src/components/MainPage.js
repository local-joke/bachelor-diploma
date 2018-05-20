import React, {Component} from 'react';
import {
    Col,
    Row,
    Button,
    Nav,
    NavItem,
    Navbar,
    NavDropdown,
    MenuItem,
} from 'react-bootstrap'
import '../styles/MainPage.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
    //api
   signOut
} from '../redux/actions/auth'
import ImagesLink from './Documents/ImagesLink'
import { Route, Link} from "react-router-dom";
import {withRouter} from 'react-router-dom'

class MainPage extends Component {

    constructor(props){
        super(props)

        this.signOut = this.signOut.bind(this)
    }

    signOut(){
        localStorage.removeItem('user_name')
        localStorage.removeItem('access_token')
        this.props.signOut()
    }

    render() {
        return <Col xs={12}>
                <Row>
                    <Col xs={12}>
                        <Row style={{paddingTop: '50px'}}>
                            <Navbar style={{marginBottom: '0px'}} fixedTop>
                                <Navbar.Header>
                                    <Navbar.Brand>
                                        <a>ПЕРСОНАЛЬНИЙ ДОВІДНИК</a>
                                    </Navbar.Brand>
                                </Navbar.Header>
                                <Nav style={{float: 'right'}}>
                                    <NavItem eventKey={1} href="#">
                                        Про проект
                                    </NavItem>
                                    <NavItem eventKey={2} href="#">
                                        <Button
                                            bsStyle="danger"
                                            onClick={this.signOut}
                                        >
                                            Выйти
                                        </Button>
                                    </NavItem>
                                </Nav>
                            </Navbar>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={2} className="catalogs-column">
                        <Row>
                            <div className="catalogs-item">
                                <Link to="/notes">Нотатки</Link>
                            </div>
                            <div className="catalogs-item">
                                <Link to="/books">Книги</Link>
                            </div>
                            <div className="catalogs-item">
                                <Link to="/documents">Документи</Link>
                            </div>
                            <div className="catalogs-item">
                                <Link to="/images">Зображення</Link>
                            </div>
                        </Row>
                    </Col>
                    <Col xs={12} sm={10}>
                        <Row className="items-background">
                            {this.props.routes.map((route, i) => <Route
                                key={i}
                                path={route.path}
                                component={route.component}
                            />)}
                            {/*<Route path='notes' component={Admin}/>
                <Route path='genre' component={Genre}/>*/}
                        </Row>
                    </Col>
                </Row>
            </Col>
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
       signOut
    }, dispatch)
}


export default withRouter(connect(null, mapDispatchToProps)(MainPage))