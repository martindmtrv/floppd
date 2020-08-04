import React from 'react';
import DarkmodeTrigger, { DarkmodeTriggerProps } from './darkmode-trigger';
import { boolean } from '@storybook/addon-knobs';

export default {
  component: DarkmodeTrigger,
  title: 'Dark mode Trigger',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: DarkmodeTriggerProps = {
    darkMode: boolean('darkmode', false),
    onChange: (b: boolean) => console.log(`change to ${b}`),
  };

  return <DarkmodeTrigger {...props} />;
};
