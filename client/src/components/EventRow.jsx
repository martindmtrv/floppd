import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AttendanceButton from './AttendanceButton';

export default function EventRow({ event, gid, handleUpdate }) {
    const [going, setGoing] = useState(event.attending.includes(sessionStorage.getItem('id')));

    function toggleAttendance() {
        fetch(`/api/groups/${gid}/events/${event._id}/${sessionStorage.getItem('id')}`, {
            method: 'PUT'
        }).then(res=>res.json())
        .then(result=>{
            setGoing(result.going);
            handleUpdate();
        }); 
    }

    return (
        <>
            <td><Link to={`/groups/${gid}/events/` + event._id}>{event.name}</Link></td>
            <td>{event.date.toDateString()}</td>
            <td>{event.location}</td>
            <td>{(going) ? (<i className="fa fa-calendar-check-o"></i>) : (<i className="fa fa-calendar-times-o"></i>)}</td>
            <td><AttendanceButton going={going} handleClick={toggleAttendance}/></td>
        </>
    );


}