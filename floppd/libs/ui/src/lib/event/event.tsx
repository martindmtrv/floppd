import React from 'react';

import './event.css';
import { IEvent } from '../event-creator/event-creator';
import {
  Grid,
  Typography,
  Divider,
  List,
  Paper,
  ListItem,
  ListItemIcon,
  Collapse,
  ListItemText,
  Button,
} from '@material-ui/core';

import {
  CheckCircle,
  ExpandLess,
  ExpandMore,
  HighlightOff,
  Check,
  Clear,
  SupervisorAccount,
  CalendarToday,
  LocationCity,
  ShortText,
  AccessTime,
} from '@material-ui/icons';

/* eslint-disable-next-line */
export interface IEventProps {
  event: IEvent;
  responded?: boolean;
  onSubmit: (b: boolean) => void;
}

export interface IEventState {
  attendingOpen: boolean;
  floppingOpen: boolean;
  guestListOpen: boolean;
  descriptionOpen: boolean;
}

export class Event extends React.Component<IEventProps, IEventState> {
  constructor(props) {
    super(props);
    this.state = {
      attendingOpen: false,
      floppingOpen: false,
      guestListOpen: false,
      descriptionOpen: false,
    };
  }

  render() {
    if (!this.props.event) {
      return <h1>loading</h1>;
    }
    const {
      title,
      attending,
      flopping,
      organizer,
      location,
      description,
    } = this.props.event;
    let date = new Date(this.props.event.date);
    return (
      <Paper>
        <div className="event">
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
            spacing={4}
            style={{ minWidth: 500 }}
          >
            <Grid item>
              <Typography variant="h5">{title}</Typography>
            </Grid>
            <Grid item>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <SupervisorAccount />
                  </ListItemIcon>
                  <ListItemText primary={organizer} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CalendarToday />
                  </ListItemIcon>
                  <ListItemText primary={date.toDateString()} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccessTime />
                  </ListItemIcon>
                  <ListItemText
                    primary={date.toLocaleTimeString().replace(':00 ', ' ')}
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() =>
                    window.open(
                      `https://maps.google.com/?q=${location}`,
                      '_blank'
                    )
                  }
                >
                  <ListItemIcon>
                    <LocationCity />
                  </ListItemIcon>
                  <ListItemText primary={location} />
                </ListItem>

                <ListItem
                  button
                  onClick={() =>
                    this.setState({
                      descriptionOpen: !this.state.descriptionOpen,
                    })
                  }
                >
                  <ListItemIcon>
                    <ShortText />
                  </ListItemIcon>
                  <ListItemText primary="Description" />
                  {this.state.descriptionOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
              </List>
              <Grid item>
                <Collapse
                  in={this.state.descriptionOpen}
                  timeout="auto"
                  unmountOnExit
                >
                  <ListItem>
                    <div
                      style={{
                        maxHeight: 200,
                        overflowY: 'scroll',
                        width: 185,
                      }}
                    >
                      <ListItemText secondary={description} />
                    </div>
                  </ListItem>
                </Collapse>
              </Grid>
            </Grid>

            {!this.props.responded && (
              <Grid item>
                <Grid container spacing={4} justify="space-evenly">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Check />}
                      onClick={() => this.props.onSubmit(true)}
                    >
                      Go
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<Clear />}
                      onClick={() => this.props.onSubmit(false)}
                    >
                      Flop
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {!this.state.guestListOpen ? (
              <Button onClick={() => this.setState({ guestListOpen: true })}>
                View Guest List
              </Button>
            ) : (
              <Grid item>
                <Grid container spacing={4} justify="space-evenly">
                  <Grid item>
                    <List>
                      <ListItem
                        button
                        onClick={() =>
                          this.setState({
                            attendingOpen: !this.state.attendingOpen,
                          })
                        }
                      >
                        <ListItemIcon>
                          <CheckCircle />
                        </ListItemIcon>
                        <ListItemText primary={`${attending.length} Going`} />
                        {this.state.attendingOpen ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </ListItem>
                      <Collapse
                        in={this.state.attendingOpen}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {attending.map((p: string, index: number) => (
                            <ListItemText key={index} primary={p} />
                          ))}
                        </List>
                      </Collapse>
                    </List>
                  </Grid>
                  <Divider flexItem orientation="vertical" />
                  <Grid item>
                    <List>
                      <ListItem
                        button
                        onClick={() =>
                          this.setState({
                            floppingOpen: !this.state.floppingOpen,
                          })
                        }
                      >
                        <ListItemIcon>
                          <HighlightOff />
                        </ListItemIcon>
                        <ListItemText primary={`${flopping.length} Flopping`} />
                        {this.state.floppingOpen ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </ListItem>
                      <Collapse
                        in={this.state.floppingOpen}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {flopping.map((p: string, index: number) => (
                            <ListItemText key={index} primary={p} />
                          ))}
                        </List>
                      </Collapse>
                    </List>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid item>
              <div style={{ height: 4 }}></div>
            </Grid>
          </Grid>
        </div>
      </Paper>
    );
  }
}

export default Event;
