import React from 'react';

import './event.scss';
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
    const {
      title,
      attending,
      flopping,
      organizer,
      location,
      description,
      date,
    } = this.props.event;
    console.log(this.props.event);
    return (
      <Paper>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          spacing={4}
          style={{ padding: 16, minWidth: 500 }}
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
                <ListItemText primary="View Description" />
                {this.state.descriptionOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={this.state.descriptionOpen}
                timeout="auto"
                unmountOnExit
              >
                <Typography variant="body2">{description}</Typography>
              </Collapse>
            </List>
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
                        {attending.map((p: string) => (
                          <ListItemText primary={p} />
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
                        {flopping.map((p: string) => (
                          <ListItemText primary={p} />
                        ))}
                      </List>
                    </Collapse>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>
    );
  }
}

export default Event;
