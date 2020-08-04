import React from 'react';
import { ErrorComponent } from './error-component';

export default {
  component: ErrorComponent,
  title: 'Error',
};

export const primary = () => {
  return <ErrorComponent msg="some error happened" />;
};
