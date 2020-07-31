import React from 'react';
import { Event, IEventProps } from './event';

export default {
  component: Event,
  title: 'Event',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: IEventProps = {
    event: {
      organizer: 'Martin Dimitrov',
      date: new Date('2020-09-03T16:30:00.000Z'),
      location: '23 Northview Road',
      title: 'Test event',
      description: 'just for fun',
    },
  };

  return <Event {...props} />;
};
