import React, {Component} from 'react';
import {routes, RouteWithSubRoutes} from './routes'
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Login from './Authorize/Login'
import Registration from './Authorize/Registration'
import {
    //non-api
    checkAuth,
    signIn
} from '../redux/actions/auth'
import {
    postMethod,
} from '../api/index'
import Preloader from './common/Preloader'

class App extends Component {

    componentWillMount() {
        this.props.checkAuth()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.auth.isAuthenticated !== nextProps.auth.isAuthenticated) {
            if (nextProps.auth.isAuthenticated) {
                let body = {
                    Login: localStorage.getItem('user_name'),
                    isAuthenticated: nextProps.auth.isAuthenticated
                }
                this.props.postMethod(signIn, body)
            }
        }
    }

    render() {
        return (
                <Router>
                    <Switch>
                        <Route path='/signUp' component={Registration}/>
                        <Route path='/login' component={Login}/>
                        <RouteWithSubRoutes
                            route={routes[0]}
                            isAuthenticated={this.props.auth.isAuthenticated}
                        />
                    </Switch>
                </Router>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        checkAuth,
        signIn,
        postMethod
    }, dispatch)
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
