import React from 'react';

import './event-creator.scss';
import { Grid, TextField, Button } from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  // @ts-ignore
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

export interface IEventCreatorProps {
  event?: IEvent;
}

export interface IEventCreatorState {
  formValues: IEvent;
  validation: IFormValidation;
}

export interface IFormValidation {
  title?: string;
  date?: string;
  location?: string;
  description?: string;
}

export interface IEvent {
  date: Date;
  location: string;
  title: string;
  description: string;
}
// TODO: Url parsing for the event maker

export class EventCreator extends React.Component<
  IEventCreatorProps,
  IEventCreatorState
> {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        date: this.props?.event?.date ?? null,
        location: this.props?.event?.location,
        title: this.props?.event?.title,
        description: this.props?.event?.description,
      },
      validation: {},
    };
  }

  handleFieldChange = (e) => {
    const newValues = { ...this.state.formValues };
    if (e instanceof Date) {
      newValues.date = e;
    } else {
      newValues[e.target.id] = e.target.value;
    }
    this.isValidated(newValues, e?.target?.id || 'date');
    this.setState({ formValues: newValues });
  };
  // handleDateChange = (d: Date) =>
  //   this.setState({ formValues: this.state.formValues.date = d });
  // handleLocationChange = (e) => this.setState({ location: e.target.value });
  // handleTitleChange = (e) => this.setState({ title: e.target.value });
  // handleDescriptionChange = (e) =>
  //   this.setState({ description: e.target.value });

  isValidated = (event: IEvent, field?: string): boolean => {
    const errors: IFormValidation = { ...this.state.validation };
    if (field) {
      if (
        !event[field] ||
        (event[field] instanceof Date && isNaN(event[field]?.getTime())) ||
        event[field] === ''
      ) {
        errors[field] = `${field} cannot be empty`;
      } else {
        errors[field] = undefined;
      }
    } else {
      Object.keys(event).forEach((field) => {
        if (
          !event[field] ||
          (event[field] instanceof Date && isNaN(event[field]?.getTime())) ||
          event[field] === ''
        ) {
          errors[field] = `${field} cannot be empty`;
        } else {
          errors[field] = undefined;
        }
      });
    }

    this.setState({ validation: errors });
    return Object.values(errors).every((field) => !field);
  };

  onSubmit = () => {
    console.log(this.state.formValues);
    if (this.isValidated(this.state.formValues)) {
      console.log('push this');
    }
  };

  render() {
    return (
      <form>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <Grid
                container
                alignItems="center"
                direction="column"
                spacing={3}
              >
                <Grid item style={{ width: '100%' }}>
                  <TextField
                    type="text"
                    id="title"
                    error={!!this.state.validation?.title}
                    label="What?"
                    onChange={this.handleFieldChange}
                    fullWidth
                  />
                </Grid>
                <Grid item style={{ width: '100%' }}>
                  <KeyboardDateTimePicker
                    value={this.state.formValues.date}
                    error={!!this.state.validation?.date}
                    onChange={this.handleFieldChange}
                    label="When?"
                    disablePast
                    format="dd/MM/yyyy hh:mm a"
                  />
                </Grid>
                <Grid item style={{ width: '100%' }}>
                  {/* TODO: add google maps here for autofilling locations  */}
                  <TextField
                    type="text"
                    id="location"
                    error={!!this.state.validation?.location}
                    label="Where?"
                    value={this.state.formValues.location}
                    onChange={this.handleFieldChange}
                    fullWidth
                  />
                </Grid>
                <Grid item style={{ width: '100%' }}>
                  <TextField
                    multiline
                    id="description"
                    type="text"
                    label="Why?"
                    error={!!this.state.validation?.description}
                    value={this.state.formValues.description}
                    onChange={this.handleFieldChange}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Button onClick={this.onSubmit}>Create Event</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </form>
    );
  }
}

export default EventCreator;
