import React from 'react';
import { Page, EventCreator, Event, NamePicker, IEvent } from '@floppd/ui';

import './app.css';

import { IEventApi, UserProfile } from '@floppd/api-interfaces';

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
      // TODO: handle error
      if (!('msg' in res)) {
        this.setState({ user: res });
        this.name = res.name;
      }
    });
  }

  createEvent = (e: IEvent) => {
    api<IEvent>('/api/event', 'POST', e).then((res: IEventApi) =>
      window.location.replace(`/event/${res._id}`)
    );
  };

  get name(): string {
    return localStorage.getItem('user') || '';
  }

  set name(n: string) {
    localStorage.setItem('user', n);
  }

  createUser = (u: UserProfile) => {
    api<UserProfile>('/api/who', 'POST', u).then((res) => {
      this.setState({ user: res });
      this.name = res.name;
    });
  };

  toggleDark = (b: boolean) => {
    api<UserProfile>('/api/who/dark', 'POST', {
      name: this.name,
      darkMode: b,
    }).then((res) => this.setState({ user: res }));
  };

  render() {
    return (
      <Page darkMode={this.state.user?.darkMode} toggleDark={this.toggleDark}>
        {!this.state.user ? (
          <NamePicker
            onSubmit={(n: string) =>
              this.createUser({ name: n, darkMode: undefined })
            }
          />
        ) : (
          <BrowserRouter>
            <Switch>
              <Route path="/event/:id" component={EventWrapper} />
              <Route path="/">
                <EventCreator
                  organizer={this.state.user.name}
                  onSubmit={this.createEvent}
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
