import React from 'react';
import { Event, ErrorComponent, IEvent } from '@floppd/ui';
import { Error, IEventApi } from '@floppd/api-interfaces';
import { api } from './api';

export class EventWrapper extends React.Component<
  {
    match: { params: { id: string } };
  },
  { event: IEventApi | Error; responded: boolean }
> {
  constructor(props) {
    super(props);
    this.state = {
      event: undefined,
      responded: undefined,
    };
  }

  getEvent = (id: string): Promise<IEventApi> =>
    api<IEventApi>(`/api/event/${id}`, 'GET');

  setResponse = (b: boolean): Promise<void> =>
    api<IEventApi>(`/api/event/${this.props.match.params.id}`, 'POST', ({
      going: b,
    } as unknown) as IEventApi).then((event) =>
      this.setState({ event: event, responded: true })
    );

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    this.getEvent(id).then((event) => {
      this.setState({ event: event as IEventApi, responded: event.responded });
    });
  }

  render() {
    const isError: boolean = this.state.event && 'msg' in this.state.event;

    return isError ? (
      <ErrorComponent msg={(this.state.event as Error).msg} />
    ) : (
      <Event
        event={this.state.event as IEvent}
        onSubmit={(b: boolean) => this.setResponse(b)}
        responded={this.state.responded}
      />
    );
  }
}
