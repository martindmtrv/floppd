import React from 'react';
import { Page, IPageProps } from './page';
import EventCreator from '../event-creator/event-creator';

export default {
  component: Page,
  title: 'Page',
};

export const empty = () => {
  /* eslint-disable-next-line */
  const props: IPageProps = {};

  return <Page />;
};

export const withEventCreator = () => (
  <Page>
    <EventCreator />
  </Page>
);
