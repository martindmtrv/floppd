import React from 'react';
import {Table} from 'reactstrap';
import EventRow from './EventRow';

export default function EventsTable({ groups, events, gid }) {
    return (
        <Table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Time</td>
                    <td>Location</td>
                    <td>Attending</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                {(gid === undefined) ? groups.map(group => {
                    return group.events.map(event=>{
                            event.date = new Date(event.date);
                            return <tr key={event._id}><EventRow event={event} gid={group._id} /></tr>
                        })    
                    }).flat() :
                    events.map(event => {
                        event.date = new Date(event.date);
                        return <tr key={event._id}><EventRow event={event} gid={gid} /></tr>
                    })
                }
            </tbody>

        </Table>
    )
}