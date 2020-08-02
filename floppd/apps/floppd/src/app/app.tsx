import React from 'react';
import { Page, EventCreator, Event, NamePicker } from '@floppd/ui';

import './app.css';

import { IEvent, UserProfile } from '@floppd/api-interfaces';

import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom';
import { EventWrapper } from './EventWrapper';
import { api } from './api';

export class App extends React.Component<{}, { user: UserProfile }> {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  componentDidMount() {
    api<UserProfile>('/api/who', 'GET').then((res) => {
      if (!('msg' in res)) {
        this.setState({ user: res });
      }
    });
  }

  createEvent = (e: IEvent) => {
    api<IEvent>('/api/event', 'POST', e).then((res) =>
      window.location.replace(`/event/${res._id}`)
    );
  };

  createUser = (u: UserProfile) => {
    api<UserProfile>('/api/who', 'POST', u).then((res) =>
      this.setState({ user: res })
    );
  };

  render() {
    return (
      <Page darkMode={this.state.user?.darkMode}>
        {!this.state.user ? (
          <NamePicker
            onSubmit={(n: string) =>
              this.createUser({ name: n, darkMode: true })
            }
          />
        ) : (
          <BrowserRouter>
            <Switch>
              <Route path="/event/:id" component={EventWrapper} />
              <Route path="/">
                <EventCreator
                  onSubmit={this.createEvent}
                  // @ts-ignore
                  event={{ organizer: this.state.user.name }}
                />
              </Route>
            </Switch>
          </BrowserRouter>
        )}
      </Page>
    );
  }
}

export default App;
