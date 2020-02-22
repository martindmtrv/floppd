import React from 'react';
import { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import App from './App';

function Landing(){
    let storageVal = sessionStorage.getItem('login');
    const [login, setLogin] = useState( storageVal === null ? 0 : parseInt(storageVal));

    function logout(){
        sessionStorage.setItem('login', 0);
        setLogin(0);
    }

    function submit(){
        sessionStorage.setItem('login', 1);
        setLogin(1);
    }

    return (
        <div>
            <h3>Landing Wrapper</h3>
            {(login) ? <Button onClick={logout}>Log me out!</Button> : <></>}
            
            <BrowserRouter>
                <PrivateRoute path='/' component={App}/>
                <Route path='/login'>
                        {(login) ? (<Redirect to='/'/>) : 
                    <Form onSubmit={submit}>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" id="username" placeholder="Username" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="pw">Password</Label>
                            <Input type="password" name="pw" id="pw" placeholder="Password" />
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>}
                </Route>
            </BrowserRouter>
        </div>
    )

}

export default Landing;