import * as React from 'react';
import { Dialog, Button, DialogActions, DialogTitle } from '@mui/material';

interface DialogBoxProps {
  openDialog: boolean;
  onClose: () => void;
  handleDelete: () => void;
}

const DialogBox: React.FC<DialogBoxProps> = ({ openDialog, onClose, handleDelete }) => {
  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete it?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete}>Yes, Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DialogBox;
