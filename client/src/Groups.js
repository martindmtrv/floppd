import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import Group from './Group';

function Groups(){
    const [groups, setGroups] = React.useState([]);

    React.useEffect(()=>{
        fetch('/api/user/5e35d4e07f89ee29924ceaaa/groups').then(res=>res.json())
            .then(groups => setGroups(groups));
    }, []);

    return (
        <div id="groups-list">
            <h3>Groups</h3>
            <Router>
            <ul>
                {groups.map((group)=> <li key={group._id}><Link to={`/group/${group._id}`}>{group.name}</Link></li>)}
            </ul>
            <Switch>
                <Route path="/group/:id">
                    <Group  />
                </Route>
            </Switch>
            </Router>
        </div>
    );
}

export default Groups;