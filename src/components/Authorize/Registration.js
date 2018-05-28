import React, {Component} from 'react';
import {
    Col,
    Row,
    Button,
    Panel,
} from 'react-bootstrap'
import '../../styles/loginForm.css'
import {Field, reduxForm, SubmissionError} from 'redux-form'
import {formInput} from "../common/FormFields"
import {bindActionCreators} from 'redux'
import {withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {
    //api
    signUp,
} from '../../redux/actions/auth'
import {
    postMethod,
} from '../../api/index'
import {maxLength45} from '../../validations'

const required = value => (value ? undefined : "Поле є обов'язковим")

const loginCheck = value =>
    value && !value.match(/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/i) ? 'Логін містить некоректні символи' : undefined

const emailCheck = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Некоректна адреса'
        : undefined

const minLength = min => value =>
    value && value.length < min ? `Пароль має бути не коротше ${min} символів` : undefined

const minLength6 = minLength(6)

class Registration extends Component {

    constructor(props){
        super(props)
        this.state = {
            redirect : false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(values){
        console.log(values)
        if(values.Password !== values.PasswordRepeat){
            throw new SubmissionError({
                PasswordRepeat: 'Паролі мають співпадати!',
                _error: 'Помилка'
            })
        }
        else {
            let body = {
                Login: values.Login,
                Password: values.Password,
                Name: values.Name,
                Email: values.Email,
            }
            console.log('FORM DATA', body)
            this.props.postMethod(signUp, body)
            this.props.clearFields()
        }
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props

        return this.props.auth.isAuthenticated ? <Redirect to="/"/>
            : <Col xs={12}>
            <Row className="loginForm">
                <form onSubmit={handleSubmit(this.handleSubmit)}>
                    <Panel>
                        <Panel.Heading>Реєстрація</Panel.Heading>
                        <Panel.Body>
                            <Field
                                name="Login"
                                component={formInput}
                                placeholder="Логін"
                                type="text"
                                label="Логін"
                                validate={[required, maxLength45, loginCheck]}
                            />
                            <Field
                                name="Password"
                                component={formInput}
                                placeholder="*********"
                                type="password"
                                label="Пароль"
                                validate={[required, minLength6, maxLength45]}
                            />
                            <Field
                                name="PasswordRepeat"
                                component={formInput}
                                placeholder="*********"
                                type="password"
                                label="Повторіть пароль"
                                validate={[required]}
                            />
                            <Field
                                name="Name"
                                component={formInput}
                                placeholder="Ім'я"
                                type="text"
                                label="Ім'я"
                                validate={[required, maxLength45]}
                            />
                            <Field
                                name="Email"
                                component={formInput}
                                placeholder="example@gmail.com"
                                type="text"
                                label="Електронна пошта"
                                validate={[required,emailCheck, maxLength45]}
                            />
                        </Panel.Body>
                        <Panel.Footer style={{textAlign: 'right', backgroundColor: 'white'}}>
                            <Button
                                style={{marginRight: '5px'}}
                                type="button"
                                onClick={reset}
                                bsStyle="success">
                                Очистити
                            </Button>
                            <Button
                                type="submit"
                                disabled={pristine || submitting}
                                bsStyle="primary">
                                Готово
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
        signUp,
        postMethod
    }, dispatch)
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

Registration = reduxForm({
    // a unique name for the form
    form: 'regForm'
})(Registration)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registration))