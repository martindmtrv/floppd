import React from 'react';
import { NamePicker, INamePickerProps } from './name-picker';

export default {
  component: NamePicker,
  title: 'NamePicker',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: INamePickerProps = {
    onSubmit: (name: string) => console.log(name),
  };

  return <NamePicker {...props} />;
};
