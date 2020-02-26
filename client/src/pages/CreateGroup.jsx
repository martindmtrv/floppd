import React from 'react';
import { Form, Input, Button } from 'reactstrap';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function CreateGroup(){
    const [createdId, setCreatedId] = useState(false);

    function submit(event){
        event.preventDefault();

        let formData = {
            name: document.getElementById('name').value
        }

        fetch('/api/groups', {
            method:'POST',
            body: JSON.stringify(formData),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>res.json()).then((data)=>setCreatedId(data._id));

    }

    return(
        (createdId) ? <Redirect to={`/groups/${createdId}`}/> : 
        <div>
            <h1>Create a New Group</h1>
            <Form onSubmit={submit}>
                <Input id='name' name="name" placeholder="Group Name" />
                <Button>Create Group</Button>
            </Form>
        </div>
    )
};
