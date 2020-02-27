import React, { useEffect } from 'react';
import { useState } from 'react';
import EventsTable from '../components/EventsTable';

export default function EventsPage(){
    const [groupedEvents, setGroupedEvents] = useState([]);

    useEffect(()=>{
        fetch(`/api/users/${sessionStorage.getItem('id')}/events`).then(res=>res.json())
            .then(events=>setGroupedEvents(events));
    }, []);

    return(
        <EventsTable groups={groupedEvents} />

    );
}