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
import NotesController from './Notes/NotesController'
import BooksController from './BooksController'
import DocumentsController from './Documents/DocumentsController'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

export default class MainPage extends Component {

    render() {
        return <Router>
            <Col xs={12}>
                <Row>
                    <Col xs={12}>
                        <Row style={{paddingTop: '50px'}}>
                            <Navbar style={{marginBottom: '0px'}} fixedTop>
                                <Navbar.Header>
                                    <Navbar.Brand>
                                        <a>ПЕРСОНАЛЬНЫЙ СПРАВОЧНИК</a>
                                    </Navbar.Brand>
                                </Navbar.Header>
                                <Nav style={{float: 'right'}}>
                                    <NavItem eventKey={1} href="#">
                                        О проекте
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
                                <Link to="/notes">Заметки</Link>
                            </div>
                            <div className="catalogs-item">
                                <Link to="/books">Книги</Link>
                            </div>
                            <div className="catalogs-item">
                                <Link to="/documents">Документы</Link>
                            </div>
                        </Row>
                    </Col>
                    <Col xs={12} sm={10}>
                        <Row className="items-background">
                            <Route path="/notes" component={NotesController}/>
                            <Route path="/books" component={BooksController}/>
                            <Route path="/documents" component={DocumentsController}/>
                            {/*<Route path='notes' component={Admin}/>
                <Route path='genre' component={Genre}/>*/}
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Router>
    }
}