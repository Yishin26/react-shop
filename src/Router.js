import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from 'pages/App'
import Login from 'pages/Login'
import Cart from 'pages/Cart'
import NotFound from 'pages/NotFound'
import Register from 'pages/Register'
const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={App} />
                <Route path='/login' component={Login} />
                <Route path='/cart' component={Cart} />
                <Route path='/register' component={Register} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>

    )

}

export default Router;