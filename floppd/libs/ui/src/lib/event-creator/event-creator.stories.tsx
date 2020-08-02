import React from 'react';
import { EventCreator, EventCreatorProps } from './event-creator';

export default {
  component: EventCreator,
  title: 'EventCreator',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: EventCreatorProps = {};

  return <EventCreator />;
};
