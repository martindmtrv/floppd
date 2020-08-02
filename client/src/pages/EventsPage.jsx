import React, { useEffect } from 'react';
import { useState } from 'react';
import EventsTable from '../components/EventsTable';
import { Switch, Route } from 'react-router-dom';
import Event from '../components/Event';

export default function EventsPage({handleUpdate}){
    const [groupedEvents, setGroupedEvents] = useState([]);

    useEffect(()=>{
        fetch(`/api/users/${sessionStorage.getItem('id')}/events`).then(res=>res.json())
            .then(events=>setGroupedEvents(events));
    }, []);

    return(
        <>
            <Route exact path="/events" render={(props)=><EventsTable {...props} groups={groupedEvents} handleUpdate={handleUpdate} />}/>
            <Route exact path="/events/:eid" render={(props)=><Event {...props}/>} />
        </>

    );
}