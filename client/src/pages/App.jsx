import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import GroupsPage from './GroupsPage';
import EventCreator from './EventCreator';
import CreateGroup from './CreateGroup';

function App() {
  return (
    <div>
      <BrowserRouter>

        <ul>
          <li><Link to='/groups'>Groups</Link></li>
          <li><Link to='/events'>Events</Link></li>
        </ul>

        <Switch>
          <Route path='/groups/:gid/event' component={EventCreator} />
          <Route path='/groups' component={GroupsPage} />
          <Route path='/events' component={()=><h1>Events</h1>}/>
          <Route path='/group' component={CreateGroup} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;