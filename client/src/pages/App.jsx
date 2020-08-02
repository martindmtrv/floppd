import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import {useState} from 'react';
import GroupsPage from './GroupsPage';
import EventCreator from './EventCreator';
import CreateGroup from './CreateGroup';
import EventsPage from './EventsPage';
import User from '../components/User';
import Event from '../components/Event';
import LiveUserStatus from '../components/LiveUserStatus';
import NavBar from '../components/NavBar';

function App() {
  const [refresh, setRefresh] = useState(false);

  function needRefresh(){
    setRefresh(!refresh);
  }

  return (
    <div>
      <NavBar />
      <LiveUserStatus id={sessionStorage.getItem('id')} refresh={refresh} />
      <BrowserRouter>

        <ul>
          <li><Link to='/groups'>Groups</Link></li>
          <li><Link to='/events'>Events</Link></li>
        </ul>

        <Switch>
        
          
          <Route exact path='/groups/:gid/events/:eid' component={Event}/>
          <Route exact path='/groups/:gid/event' component={EventCreator} />
          <Route exact path='/groups' render={(props)=><GroupsPage {...props} handleUpdate={needRefresh}/>} />
          <Route exact path='/events' render={(props)=><EventsPage {...props} handleUpdate={needRefresh} />} />
          <Route exact path='/group' component={CreateGroup} />
          <Route exact path='/users/:uid' component={User} />
          <Route path='/' render={(props)=><h1>ROOT</h1>}/>
          
          
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;