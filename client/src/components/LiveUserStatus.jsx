import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Col } from 'reactstrap';

export default function LiveUserStatus({id, refresh}){
    const [user, setUser] = useState({});

    useEffect(()=>{
        fetch(`/api/users/${id}`).then(res=>res.json()).then(user=>setUser(user))
    }, [refresh]);

    return (
        <Container>
            <Col>
                <p><b>{user.username}</b> -> Score: {user.rating}</p>
            </Col>
        </Container>
    )
};