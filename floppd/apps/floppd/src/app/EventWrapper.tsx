import React from 'react';
import { Event, ErrorComponent, IEvent } from '@floppd/ui';
import { Error, IEventApi } from '@floppd/api-interfaces';
import { api } from './api';

export class EventWrapper extends React.Component<
  {
    match: { params: { id: string } };
  },
  { event: IEventApi | Error }
> {
  constructor(props) {
    super(props);
    this.state = {
      event: undefined,
    };
  }

  getEvent = (id: string): Promise<IEventApi> =>
    api<IEventApi>(`/api/event/${id}`, 'GET');

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
    const isError: boolean = this.state.event && 'msg' in this.state.event;
    const responded: boolean =
      !isError &&
      (this.state.event as IEventApi)?.hasAnswered.includes(
        localStorage.getItem('user')
      );
    return isError ? (
      <ErrorComponent msg={(this.state.event as Error).msg} />
    ) : (
      <Event
        event={this.state.event as IEvent}
        onSubmit={(b: boolean) => null}
        responded={responded}
      />
    );
  }
}
