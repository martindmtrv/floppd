import React from 'react';
import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { Link, BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Group from '../components/Group';

export default function GroupsPage() {
    const [groups, setGroups] = useState([]);
    function fetchData(cb) {
        // sample json response
        let data = JSON.parse('[{ "_id" : "5e448d353a76fd359fa4817c", "admins" : [ "5e448c7476e84b3589fcebe8" ], "users" : [ "5e448cb456b17c3598c9f68d" ], "name" : "aphas", "events" : [{"name":"Smash"}], "__v" : 2 }]');

        // fake async request
        cb(data);
    }

    useEffect(() => {
        fetchData(data => { setGroups(data) });
    }, [])

    return (
        <Switch>
            <Route exact path='/groups'>
                <h1>Groups Page</h1>
                <Table>
                    <thead>
                        <tr>
                            <td>Group Name</td>
                            <td># of users</td>
                            <td># of admins</td>
                            <td>Latest Event</td>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map(group => {
                            return (
                                <tr key={group._id}>
                                    <td><Link to={'/groups/' + group._id}>{group.name}</Link></td>
                                    <td>{group.users.length}</td>
                                    <td>{group.admins.length}</td>
                                    <td>{group.events[0].name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Route>

            <Route exact path='/groups/:gid' component={Group} />
        </Switch>
    )
}