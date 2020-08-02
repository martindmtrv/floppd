import React from 'react';
import { Event, EventProps } from './event';

export default {
  component: Event,
  title: 'Event',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: EventProps = {};

  return <Event />;
};
