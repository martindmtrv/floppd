import React from 'react';
import {useState} from 'react';
import ReactDatetime from 'react-datetime';
import { InputGroup, InputGroupText, InputGroupAddon, Form, Button, Input,  FormGroup } from 'reactstrap';
import { Redirect } from 'react-router-dom';

function EventCreator({match: {params: {gid}}}) {
    const [createdId, setCreatedId] = useState(false);

    function submit(event) {
        event.preventDefault();

        let formData = {
            name: document.getElementById('name').value,
            location: document.getElementById('location').value,
            date: new Date(document.getElementById('date').value),
            summary: document.getElementById('description').value
        }

        fetch(`/api/groups/${gid}/events`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then(res=>res.json()).then(data=>{
            setCreatedId(data._id);
        });


    }
    return (
        (createdId) ? <Redirect to={`/events/${createdId}`} /> :
        <Form autoComplete='off' onSubmit={submit}>
            <FormGroup>
                <Input name="name" id="name" placeholder="Name" />
                <Input name="location" id="location" placeholder="Location" />
                <Input type="textarea" name="description" id="description" placeholder="Description" />
                <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                        </InputGroupText>
                    </InputGroupAddon>
                    <ReactDatetime
                        inputProps={{
                            placeholder: "Date",
                            id:"date"
                        }}
                    />
                </InputGroup>
                <Button>Submit</Button>
            </FormGroup>
        </Form>
    )
}

export default EventCreator;