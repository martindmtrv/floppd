import React from 'react';

import {
  Container,
  Typography,
  Grid,
  Paper,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';

import Confetti from '../../../assets/Confetti-4s-1920px.svg';
import ConfettiDark from '../../../assets/Confetti-dark-4s-1920px.svg';

import './page.scss';

/* eslint-disable-next-line */
export interface IPageProps {
  darkMode?: boolean;
}

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

export class Page extends React.Component<IPageProps, {}> {
  render() {
    const children = (Array.isArray(this.props?.children)
      ? (this.props.children as React.ReactNode[])
      : [this.props.children]
    )?.map?.((child, index) => (
      <Grid item key={index}>
        {child}
      </Grid>
    ));

    return (
      <ThemeProvider theme={this.props.darkMode ? darkTheme : undefined}>
        <div
          style={{
            background: `url(${
              this.props.darkMode ? ConfettiDark : Confetti
            }) center/cover`,
            height: '100%',
          }}
        >
          <Grid
            container
            justify="space-around"
            spacing={4}
            alignItems="center"
            direction="column"
            style={{ margin: 0, width: '100%' }}
          >
            <Grid item>
              <Paper style={{ boxShadow: 'unset', backgroundColor: 'unset' }}>
                <Typography variant="h4">floppd</Typography>
              </Paper>
            </Grid>
            {children}
          </Grid>
        </div>
      </ThemeProvider>
    );
  }
}

export default Page;
