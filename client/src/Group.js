import React from 'react';

import {
    useParams
  } from "react-router-dom";

function Group(){
    const [group, setGroup] = React.useState({});
    let {id} = useParams();
    
    React.useEffect(()=>{
        fetch(`/api/group/${id}`).then(res=>res.json()).then(group=>{
            console.log(group);
            setGroup(group);
        })
    }, [])

    return (
        <div>
            <h1>Group</h1>
            <h2>Admins</h2>
            <ul>
                {(group.admins !== undefined) ? group.admins.map(a => <li key={a._id}> {a.username} </li>): null}
            </ul>
            <h2>Users</h2>
            <ul>
                {(group.users !== undefined) ? group.users.map(a => <li key={a._id}> {a.username} </li>): null}
            </ul>
        </div>
    )
};

export default Group;
