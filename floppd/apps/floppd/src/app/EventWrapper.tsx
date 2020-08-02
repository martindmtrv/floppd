import React from 'react';

import { useParams } from 'react-router-dom';

import { Event, IEvent, ErrorComponent } from '@floppd/ui';
import { Error } from '@floppd/api-interfaces';
import { api } from './api';

export class EventWrapper extends React.Component<
  {
    match: { params: { id: string } };
  },
  { event: IEvent | Error }
> {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
    };
  }

  getEvent = (id: string): Promise<IEvent> =>
    api<IEvent>(`/api/event/${id}`, 'GET');

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    this.getEvent(id).then((event) => {
      this.setState({ event: event });
    });
  }

  render() {
    return this.state.event && 'msg' in this.state.event ? (
      <ErrorComponent msg={this.state.event.msg} />
    ) : (
      <Event
        event={(this.state.event as unknown) as IEvent}
        onSubmit={(b: boolean) => null}
      />
    );
  }
}
