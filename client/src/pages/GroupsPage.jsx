import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { Link, Switch, Route } from 'react-router-dom';
import Group from '../components/Group';

export default function GroupsPage({handleUpdate}) {
    const [groups, setGroups] = useState([]);

    function fetchData(cb) {
        fetch(`/api/users/${sessionStorage.getItem('id')}/groups`)
            .then(res=>res.json()).then(data=>cb(data.groups));
    }

    useEffect(() => fetchData(data => { setGroups(data) })
    , []);


    return (
        <>
            <Route exact path='/groups'>
                <h1>Groups Page</h1>
                <Link to='/group'><Button>New Group</Button></Link>
                <Table>
                    <thead>
                        <tr>
                            <td>Group Name</td>
                            <td># of users</td>
                            <td># of admins</td>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map(group => {
                            return (
                                <tr key={group._id}>
                                    <td><Link to={'/groups/' + group._id}>{group.name}</Link></td>
                                    <td>{group.users.length}</td>
                                    <td>{group.admins.length}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Route>

            <Route exact path='/groups/:gid' render={(props)=><Group {...props} handleUpdate={handleUpdate}/>} />
        </>
    )
}