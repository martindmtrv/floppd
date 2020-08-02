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
        fetch('/logout', {
            method:'POST'
        }).then(res=>res.json())
        .then(data=>{
            sessionStorage.setItem('login', 0);
            setLogin(0);
        });
        
    }

    function submit(event){

        event.preventDefault();
        let formData = {
            username: document.getElementById('username').value,
            pw: document.getElementById('pw').value
        }
        // do some error checks now TODO

        fetch('/login', {
            method:'POST',
            body: JSON.stringify(formData),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>{
            if (res.status === 200){
                return res.json();
            } else{
                throw res.json();
            }
        }).then(data=>{
            // maybe return current user id
            sessionStorage.setItem('login', 1);
            sessionStorage.setItem('id',data.id);
            setLogin(1);
        }).catch(e=>{
            // do something with this error should change form elements
            e.then(e=> alert(e.msg));
        });
        
    }

    return (
        <div>
            <h1>Floppd</h1>
            {(login) ? <Button onClick={logout}>Log me out!</Button> : <></>}
            
            <BrowserRouter>
                <PrivateRoute path='/' component={App}/>
                <Route path='/login'>
                        {(login) ? (<Redirect to='/'/>) : 
                    <Form autoComplete='off' onSubmit={submit}>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" id="username" placeholder="Username" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="pw">Password</Label>
                            <Input type="password" name="pw" id="pw" placeholder="Password" />
                        </FormGroup>
                        <Button>Login</Button>
                    </Form>}
                </Route>
            </BrowserRouter>
        </div>
    )

}

export default Landing;