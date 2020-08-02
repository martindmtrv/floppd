import React from 'react';
import {useState} from 'react';
import { useEffect } from 'react';

export default function Event({match: {params:{eid, gid}}}){
    const [event, setEvent] = useState({});

    useEffect(()=>{
        fetch(`/api/groups/${gid}/events/${eid}`).then(res=>res.json())
            .then(event=>setEvent(event));
    }, []);
    return(
        <div>
            <h1>Event "{event.name}"</h1>
            <ul>
                <li key="date">{Date(event.date)}</li>
                <li key="summary"><p>Summary: {event.summary}</p></li>
                <li><ul>Real ones: </ul></li>
                
            </ul>
        </div>
    )
}