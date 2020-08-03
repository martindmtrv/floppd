import React from 'react';
import { Event, IEventProps } from './event';
import { TestEvent } from './TestEvent';

export default {
  component: Event,
  title: 'Event',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: IEventProps = {
    event: TestEvent,
    onSubmit: (b: boolean) => console.log(b ? 'Going' : 'flopping'),
  };

  return <Event {...props} />;
};
