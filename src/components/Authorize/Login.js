import React, {Component} from 'react';
import {
    Col,
    Row,
    Button,
    Panel,
    Nav,
    NavItem,
    Navbar,
    NavDropdown,
    MenuItem,
} from 'react-bootstrap'
import '../../styles/loginForm.css'
import {Field, reduxForm} from 'redux-form'
import {formInput, formTextArea} from "../common/FormFields"
import {bindActionCreators} from 'redux'
import {withRouter,Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {
    signIn
} from '../../redux/actions/auth'
import {
    postMethod,
} from '../../api/index'

class Login extends Component {

    constructor(props){
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(values){
        console.log(values)
        let body = {
            Login: values.Login,
            Password: values.Password,
            isAuthenticated: false
        }
        console.log('FORM DATA', body)
        this.props.postMethod(signIn, body)
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props

        return this.props.auth.isAuthenticated ? <Redirect to="/"/>
            : <Col xs={12}>
            <Row className="loginForm">
                <form onSubmit={handleSubmit(this.handleSubmit)}>
                <Panel>
                    <Panel.Heading>Авторизація</Panel.Heading>
                    <Panel.Body>
                        <Field
                            name="Login"
                            component={formInput}
                            placeholder="username"
                            type="text"
                            label="Логін"
                        />
                        <Field
                            name="Password"
                            component={formInput}
                            placeholder="userpassword"
                            type="password"
                            label="Пароль"
                        />
                    </Panel.Body>
                    <Panel.Footer style={{textAlign: 'right', backgroundColor: 'white'}}>
                        <Button
                            style={{marginRight: '5px'}}
                            type="button"
                            bsStyle="success">
                            <Link to="/signUp">Реєстрація</Link>
                        </Button>
                        <Button
                            type="submit"
                            disabled={pristine || submitting}
                            bsStyle="primary">
                            Увійти
                        </Button>
                    </Panel.Footer>
                </Panel>
                </form>
            </Row>
        </Col>
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signIn,
        postMethod
    }, dispatch)
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

Login = reduxForm({
    // a unique name for the form
    form: 'loginForm'
})(Login)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))