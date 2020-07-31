import React from 'react';

import { Container, Typography, Grid, Paper } from '@material-ui/core';

import './page.scss';

/* eslint-disable-next-line */
export interface PageProps {}

export class Page extends React.Component<PageProps, {}> {
  render() {
    return (
      <Container>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography variant="h1" style={{ padding: 4 }}>
              Floppd
            </Typography>
          </Grid>
          {this.props.children}
        </Grid>
      </Container>
    );
  }
}

export default Page;
