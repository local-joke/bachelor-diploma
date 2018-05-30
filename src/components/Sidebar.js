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

const getUserpicSrc = (user) => {
    (user && user.ImageURL) ? user.ImageURL : 'http://marketline.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
}

class Sidebar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            links: [
                {
                    path: '/profile',
                    text: <li>
                        <img src={getUserpicSrc(this.props.currentUser)} className="userPic-small" width="25px"
                             height='25px'/>
                        Мій профіль
                    </li>
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
                {
                    path: '/login',
                    text:  <div onClick={() => this.props.signOut()}>
                        <Glyphicon glyph="log-out" style={{marginRight: '10px'}} onClick={this.signOut}/>
                        Вийти
                    </div>
                }
            ]

        }
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

                <Navbar.Header style={{paddingBottom: '10px'}}>
                    <Navbar.Brand>
                        <a href="/" style={{fontSize: '15px'}}>ПЕРСОНАЛЬНИЙ ДОВІДНИК</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav style={{marginTop: '10px'}}>
                        {this.state.links.map((link, index) => (
                            <NavItem eventKey={index + 1} key={index}>
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