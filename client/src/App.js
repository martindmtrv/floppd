import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Groups from './Groups';
import Events from './Events';
import Dashboard from './Dashboard';

function App() {
  return (
    <div>
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/groups">Groups</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/groups">
            <Groups />
          </Route>
          <Route path="/events">
            <Events />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;