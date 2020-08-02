import React from 'react';
import { Page, PageProps } from './page';

export default {
  component: Page,
  title: 'Page',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: PageProps = {};

  return <Page />;
};
