import React from 'react';
import { Page, IPageProps } from './page';
import EventCreator from '../event-creator/event-creator';
import { Event } from '../event/event';

import { boolean } from '@storybook/addon-knobs';
import { TestEvent } from '../event/TestEvent';

export default {
  component: Page,
  title: 'Page',
};

export const empty = () => {
  /* eslint-disable-next-line */
  const props: IPageProps = {};

  return <Page darkMode={boolean('Dark mode', true)} />;
};

export const withEventCreator = () => (
  <Page darkMode={boolean('Dark mode', true)}>
    <EventCreator organizer="Martin" />
  </Page>
);

export const eventPage = () => (
  <Page darkMode={boolean('Dark mode', true)}>
    <Event
      event={TestEvent}
      onSubmit={(b) => console.log(b ? 'Going' : 'flopping')}
    />
  </Page>
);
