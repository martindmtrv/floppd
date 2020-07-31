import React from 'react';

import './event.scss';
import { IEvent } from '../event-creator/event-creator';

/* eslint-disable-next-line */
export interface IEventProps {
  event: IEvent;
}

export class Event extends React.Component<IEventProps, {}> {
  render() {
    console.log(this.props.event);
    return <h1>test</h1>;
  }
}

export default Event;
