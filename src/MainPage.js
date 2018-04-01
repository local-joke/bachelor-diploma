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
import './styles/MainPage.css'
import NotesController from './components/NotesController'
import BooksController from './components/BooksController'
import {ReactReader} from 'react-reader'

export default class MainPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentCatalog: 0,
            catalogs: [
                {
                    Id: 0,
                    Name: 'Заметки'
                },
                {
                    Id: 1,
                    Name: 'Книги'
                },
                {
                    Id: 2,
                    Name: 'Документы'
                }
            ],
        }
    }

    handleChangeCatalog(id){
        this.setState({
            currentCatalog: id
        })
    }

    renderCatalog(){
        console.log('WOW RENDER', this.state.currentCatalog)
        switch(this.state.currentCatalog){
            case 0 : return <NotesController/>;
            case 1 : return <BooksController/>;
            default : return <div></div>
        }
    }

    render() {
        return <Col xs={12}>
            <Row>
                <Col xs={12}>
                    <Row style={{paddingTop: '50px'}}>
                        <Navbar style={{marginBottom: '0px'}} fixedTop>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <a href="#home">ПЕРСОНАЛЬНЫЙ СПРАВОЧНИК</a>
                                </Navbar.Brand>
                            </Navbar.Header>
                            <Nav>
                                <NavItem eventKey={1} href="#">
                                    Link
                                </NavItem>
                                <NavItem eventKey={2} href="#">
                                    Link
                                </NavItem>
                                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                    <MenuItem eventKey={3.1}>Action</MenuItem>
                                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                    <MenuItem divider/>
                                    <MenuItem eventKey={3.4}>Separated link</MenuItem>
                                </NavDropdown>
                            </Nav>
                        </Navbar>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={2} className="catalogs-column">
                    <Row>
                        {this.state.catalogs.map((c, key) => {
                            return <div className="catalogs-item" onClick={() => this.handleChangeCatalog(c.Id)}>
                                {c.Name}
                            </div>
                        })
                        }
                    </Row>
                </Col>
                <Col xs={12} sm={10}>
                    <Row className="items-background">
                        {this.renderCatalog()}
                    </Row>
                </Col>
            </Row>
        </Col>
    }
}