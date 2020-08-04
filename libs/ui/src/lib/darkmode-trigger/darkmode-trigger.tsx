import React from 'react';

import './darkmode-trigger.scss';
import { IconButton } from '@material-ui/core';
import { Brightness7, Brightness4 } from '@material-ui/icons';

/* eslint-disable-next-line */
export interface DarkmodeTriggerProps {
  darkMode: boolean;
  onChange: (b: boolean) => void;
}

export const DarkmodeTrigger = (props: DarkmodeTriggerProps) => {
  return (
    <IconButton onClick={() => props.onChange(!props.darkMode)}>
      {props.darkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default DarkmodeTrigger;
