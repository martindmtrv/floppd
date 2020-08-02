import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';

import GroupsPage from '../pages/GroupsPage';

export default function GroupsRouter({handleUpdate}){
    let match = useRouteMatch();


    return (
        <Switch>
            
            <Route path={`${match.path}`} render={(props)=><GroupsPage {...props} handleUpdate={needRefresh}/>}/>

        </Switch>
    )
}