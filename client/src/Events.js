import React from 'react';

function Events(){
    const [events, setEvents] = React.useState([]);

    React.useEffect(()=>{
        fetch('/api/user/5e35d4e07f89ee29924ceaaa/events').then(res=>res.json())
            .then(events => setEvents(events));
    }, []);

    return (
        <div id="events-list">
            <h2>Events</h2>
            <ul>
                {events.map(event => <li key={event._id}>{event.name} {(new Date(event.date)).toDateString()}</li>)}
            </ul>
        </div>
    );
}

export default Events;