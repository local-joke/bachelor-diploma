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
import DocumentsController from './components/DocumentsController'
import {ReactReader} from 'react-reader'

export default class MainPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentCatalog: 0,
            header: 'ПЕРСОНАЛЬНЫЙ СПРАВОЧНИК',
            catalogs: [
                {
                    Id: 1,
                    Name: 'Заметки'
                },
                {
                    Id: 2,
                    Name: 'Книги'
                },
                {
                    Id: 3,
                    Name: 'Документы'
                }
            ],
        }
        this.handleChangeCatalog = this.handleChangeCatalog.bind(this)
    }

    handleChangeCatalog(id) {
        this.setState({
            currentCatalog: id
        })
    }

    renderCatalog() {
        console.log('WOW RENDER', this.state.currentCatalog)
        switch (this.state.currentCatalog) {
            case 1 :
                return <NotesController/>;
            case 2 :
                return <BooksController/>;
            case 3 :
                return <DocumentsController/>;
            default :
                return <div>ЛОХ</div>
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
                                    <a>{this.state.header}</a>
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
                        {this.state.catalogs.map((c, key) => {
                            return <div className="catalogs-item" key={key} onClick={() => this.handleChangeCatalog(c.Id)}>
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