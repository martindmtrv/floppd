import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

function Group({match: {params: {gid}}}){
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

            <Table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Rating</td>
                        <td>Permission</td>
                    </tr>
                </thead>
                <tbody>
                    {group.admins.map(admin =>{
                        return (
                            <tr key={admin._id}>
                                <td><Link to={'/users/'+admin._id}>{admin.username}</Link></td>
                                <td>{admin.rating}</td>
                                <td>Admin</td>
                            </tr>
                        )
                    })}
                    {group.users.map(user =>{
                        return (
                            <tr key={user._id}>
                                <td><Link to={'/users/'+user._id}>{user.username}</Link></td>
                                <td>{user.rating}</td>
                                <td>User</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </Table>
            <h2>Events</h2>
            <Table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Time</td>
                        <td>Location</td>
                        <td>Attending</td>
                    </tr>
                </thead>
                <tbody>
                    {group.events.map(event => {
                        event.date = new Date(event.date);
                        return (
                            <tr key={event._id}>
                                <td><Link to={'/events/'+event._id}>{event.name}</Link></td>
                                <td>{event.date.toDateString()}</td>
                                <td>{event.location}</td>
                                <td><Input type='checkbox'/></td>
                            </tr>

                        )
                    })}
                </tbody>

            </Table>
        </div>
        
    )
}

export default Group;