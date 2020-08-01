import React from 'react';
import { Page, IPageProps } from './page';
import EventCreator from '../event-creator/event-creator';
import { TestEvent } from '../event/event.stories';
import { Event } from '../event/event';

import { boolean } from '@storybook/addon-knobs';

export default {
  component: Page,
  title: 'Page',
};

export const empty = () => {
  /* eslint-disable-next-line */
  const props: IPageProps = {};

  return <Page darkMode={boolean('Dark mode', false)} />;
};

export const withEventCreator = () => (
  <Page darkMode={boolean('Dark mode', false)}>
    <EventCreator />
  </Page>
);

export const eventPage = () => (
  <Page darkMode={boolean('Dark mode', false)}>
    <Event
      event={TestEvent}
      onSubmit={(b) => console.log(b ? 'Going' : 'flopping')}
    />
  </Page>
);
