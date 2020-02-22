import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={(props)=>
            (sessionStorage.getItem('login') === "1" ? <Component {...props}/> : <Redirect to='/login'/>)
        }/>
    )
}