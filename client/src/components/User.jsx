import React from 'react';
import {useState} from 'react';
import { useEffect } from 'react';

export default function User({match: {params:{uid}}}){
    const [user, setUser] = useState({});

    useEffect(()=>{
        fetch(`/api/users/${uid}`).then(res=>res.json())
            .then(user=>setUser(user));
    }, []);
    return(
        <div>
            <h1>{user.username}</h1>
            <ul>
                <li key="rating">Rating: {user.rating}</li>
            </ul>
        </div>
    )
}