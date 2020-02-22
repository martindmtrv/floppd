import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path='/groups' component={()=><h1>Groups</h1>}/>
        <Route path='/events' component={()=><h1>Events</h1>} />
      </BrowserRouter>
    </div>
  )
}

export default App;