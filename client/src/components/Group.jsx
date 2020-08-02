import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import EventsTable from './EventsTable';
import UserTable from './UserTable';

function Group({match: {params: {gid}}, handleUpdate}){
    const [group, setGroup] = useState({admins:[], users:[], events: []});

    function fetchData(cb){
        fetch(`/api/groups/${gid}`)
            .then(res=>res.json()).then(data=>cb(data));
    }

    useEffect(()=>{
        fetchData(group => setGroup(group));
    }, []);

    
    return(
        <div>
            <h1>Group {group.name}</h1>
            <Link to={`/groups/${group._id}/event`}><Button>Add Event</Button></Link>
            

            <h2>Members</h2>
            <UserTable group={group} />
            
            <h2>Events</h2>
            <EventsTable gid={gid} events={group.events} handleUpdate={handleUpdate}/>
 
        </div>
        
    )
}

export default Group;