import React from 'react';

import {
  Typography,
  Grid,
  Paper,
  createMuiTheme,
  ThemeProvider,
  Link,
} from '@material-ui/core';

import Confetti from '../../../assets/Confetti-4s-1920px.svg';
import ConfettiDark from '../../../assets/Confetti-dark-4s-1920px.svg';

import './page.scss';
import DarkmodeTrigger from '../darkmode-trigger/darkmode-trigger';

/* eslint-disable-next-line */
export interface IPageProps {
  darkMode?: boolean;
  toggleDark: (b: boolean) => void;
}

export class Page extends React.Component<IPageProps, {}> {
  render() {
    const theme = createMuiTheme({
      palette: {
        type: this.props.darkMode ? 'dark' : 'light',
      },
    });
    const children = (Array.isArray(this.props?.children)
      ? (this.props.children as React.ReactNode[])
      : [this.props.children]
    )?.map?.((child, index) => (
      <Grid item key={index}>
        {child}
      </Grid>
    ));

    return (
      <ThemeProvider theme={theme}>
        <div
          style={{
            background: `url(${
              this.props.darkMode ? ConfettiDark : Confetti
            }) center/cover`,
            height: '100%',
            maxHeight: '100%',
          }}
        >
          <DarkmodeTrigger
            darkMode={this.props.darkMode}
            onChange={(b: boolean) => {
              this.props.toggleDark(b);
              this.forceUpdate();
            }}
          />
          <Grid
            container
            justify="space-around"
            spacing={4}
            alignItems="center"
            direction="column"
            style={{ width: '100%', padding: 16, margin: 0 }}
          >
            <Grid item>
              <Paper style={{ boxShadow: 'unset', backgroundColor: 'unset' }}>
                <Link href="/" underline="none" color="textPrimary">
                  <Typography variant="h4">floppd</Typography>
                </Link>
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
