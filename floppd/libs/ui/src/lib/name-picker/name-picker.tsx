import React from 'react';

import './name-picker.scss';
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from '@material-ui/core';

/* eslint-disable-next-line */
export interface INamePickerProps {
  onSubmit: (s: string) => void;
}

export interface INamePickerState {
  isOpen: boolean;
  name: string;
  error: boolean;
}

export class NamePicker extends React.Component<
  INamePickerProps,
  INamePickerState
> {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
      name: '',
      error: false,
    };
  }

  handleClose = () => this.setState({ isOpen: false });

  isValidated = (): boolean =>
    this.state.name.length != 0 &&
    this.setState({ error: false }) === undefined;

  handleChange = (e) => this.setState({ name: e.target.value });

  onSubmit = () => {
    if (this.isValidated()) {
      this.props.onSubmit(this.state.name);
      this.handleClose();
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <Dialog open={this.state.isOpen} aria-labelledby="form-dialog-title">
        <DialogContent>
          <TextField
            autoFocus
            autoComplete="name"
            margin="dense"
            value={this.state.name}
            error={this.state.error}
            onChange={this.handleChange}
            id="name"
            label="Who"
            type="name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onSubmit} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default NamePicker;
