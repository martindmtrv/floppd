import React from 'react';

import './event-creator.css';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  // @ts-ignore
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import NamePicker from '../name-picker/name-picker';

export interface IEventCreatorProps {
  event?: IEvent;
  organizer: string;
  onSubmit?: (e: IEvent) => void;
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
  organizer: string;
  attending?: string[];
  flopping?: string[];
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
        organizer: this.props.organizer,
        date: this.props?.event?.date ?? null,
        location: this.props?.event?.location,
        title: this.props?.event?.title,
        description: this.props?.event?.description,
        flopping: [],
        attending: [this.props.organizer],
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
    if (this.isValidated(this.state.formValues)) {
      this.props.onSubmit?.(this.state.formValues);
    }
  };

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Paper>
          <Grid
            container
            justify="space-around"
            spacing={4}
            alignItems="center"
            direction="column"
            style={{ minWidth: 500 }}
          >
            <Grid item>
              <Grid
                container
                alignItems="center"
                direction="column"
                spacing={3}
              >
                <Grid item style={{ width: '100%' }}>
                  <TextField
                    autoComplete={'off'}
                    type="text"
                    id="title"
                    error={!!this.state.validation?.title}
                    label="What"
                    onChange={this.handleFieldChange}
                    fullWidth
                  />
                </Grid>
                <Grid item style={{ width: '100%' }}>
                  <KeyboardDateTimePicker
                    value={this.state.formValues.date}
                    error={!!this.state.validation?.date}
                    onChange={this.handleFieldChange}
                    label="When"
                    disablePast
                    format="dd/MM/yyyy hh:mm a"
                  />
                </Grid>
                <Grid item style={{ width: '100%' }}>
                  {/* TODO: add google maps here for autofilling locations  */}
                  <TextField
                    type="text"
                    id="location"
                    autoComplete={'address-line1'}
                    error={!!this.state.validation?.location}
                    label="Where"
                    value={this.state.formValues.location}
                    onChange={this.handleFieldChange}
                    fullWidth
                  />
                </Grid>
                <Grid item style={{ width: '100%' }}>
                  <TextField
                    multiline
                    className={'why-input'}
                    style={{ maxHeight: 100, overflowY: 'scroll' }}
                    id="description"
                    type="text"
                    label="Why"
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
        </Paper>
      </MuiPickersUtilsProvider>
    );
  }
}

export default EventCreator;
