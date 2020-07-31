import React from 'react';

import { Container, Typography, Grid, Paper } from '@material-ui/core';

import Confetti from '../../../assets/Confetti-4s-1920px.svg';

import './page.scss';

/* eslint-disable-next-line */
export interface IPageProps {}

export class Page extends React.Component<IPageProps, {}> {
  render() {
    const children = (Array.isArray(this.props?.children)
      ? (this.props.children as React.ReactNode[])
      : [this.props.children]
    )?.map?.((child) => <Grid item>{child}</Grid>);

    return (
      <div
        style={{
          background: `url(${Confetti}) center/cover`,
          width: '98vw',
          height: '98vh',
        }}
      >
        <Grid
          container
          justify="space-around"
          spacing={4}
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <Typography variant="h4">floppd</Typography>
          </Grid>
          {children}
        </Grid>
      </div>
    );
  }
}

export default Page;
