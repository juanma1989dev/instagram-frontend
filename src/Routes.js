import React, { Component } from 'react';
import {Route, BrowserRouter  as Router, Redirect}  from 'react-router-dom';
import {ApolloProvider} from 'react-apollo'
import client  from './graphql'

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import User from './components/User/User';
import Me from './components/Me/Me';
import PhotoUpload from './components/PhotoUpload/PhotoUpload';

import isAuthenticate from './resolvers/isAuthenticate';



class Routes extends Component{
    render(){

        const PrivateRoute = ({component:Component, ...rest}) => (
            <Route {...rest} render={(props)=>(
                isAuthenticate() === true
                ? <Component {...props} />
                : <Redirect to="/login" />
            )} />
        )

        return(
            <Router>
                <ApolloProvider client={client}>
                    <main>
                        <PrivateRoute exact path='/' component={Home} />
                        <PrivateRoute exact path='/user/:id' component={User} />
                        <PrivateRoute exact path='/me/' component={Me} />
                        <PrivateRoute exact path='/photoUpload' component={PhotoUpload} />

                        <Route exact path='/login' component={Login} />
                        <Route exact path='/signup' component={Signup}/>
                    </main>
                </ApolloProvider>
            </Router>
        )
    }
}

export default Routes;