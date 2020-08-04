import React from 'react';

import './error.scss';
import { Typography, Paper, Grid } from '@material-ui/core';

/* eslint-disable-next-line */
export interface ErrorComponentProps {
  msg: string;
}

export function ErrorComponent({ msg }: ErrorComponentProps) {
  return (
    <Paper style={{ width: 400 }}>
      <Grid container spacing={4} alignItems="center" justify="space-around">
        <Grid item>
          <Typography variant="body1">{msg}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ErrorComponent;
