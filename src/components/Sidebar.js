import React, {Component} from 'react';
import {
    Col,
    Row,
    Button,
    Nav,
    NavItem,
    Navbar,
    Glyphicon,
    NavDropdown,
    MenuItem,
} from 'react-bootstrap'
import '../styles/sidebar.css'
import {Route, Link} from "react-router-dom";
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
    //api
    signOut
} from '../redux/actions/auth'

const links = [
    {
        path: '/profile',
        text: 'Мій профіль'
    },
    {
        path: '/notes',
        text: 'Нотатки'
    },
    {
        path: '/books',
        text: 'Книги'
    },
    {
        path: '/documents',
        text: 'Документи'
    },
    {
        path: '/images',
        text: 'Зображення'
    },
]

class Sidebar extends Component {

    constructor(props) {
        super(props)

        this.signOut = this.signOut.bind(this)
    }

    signOut() {
        localStorage.removeItem('user_name')
        localStorage.removeItem('access_token')
        this.props.signOut()
    }

    render() {

        let {currentUser} = this.props

        return <div id="sidebar-menu" className='sideBarMenuContainer'>
            <Navbar fluid className='sidebar' inverse>

                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">ПЕРСОНАЛЬНИЙ ДОВІДНИК</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>

                <Navbar.Collapse>
                    <Navbar.Text className='userMenu'>
                        <Navbar.Link href="/notes"><Glyphicon glyph="home"/></Navbar.Link>
                        <Navbar.Link><Glyphicon glyph="log-out" onClick={this.signOut}/></Navbar.Link>
                    </Navbar.Text>
                    <Nav>
                        {links.map((link, index) => (
                            <NavItem eventKey={index + 1}>
                                <Link to={link.path} className="customLink">
                                    {link.text}
                                </Link>
                            </NavItem>
                        ))
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signOut
    }, dispatch)
}

function mapStateToProps(state) {
    return {
        currentUser: state.auth.currentUser
    }
}


export default withRouter(connect(null, mapDispatchToProps)(Sidebar))