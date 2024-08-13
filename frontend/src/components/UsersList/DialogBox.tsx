import * as React from 'react';
import { Dialog, Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface DialogBoxProps {
  openDialog: boolean;
  onClose: () => void;
  userId: string | null;
}

const DialogBox: React.FC<DialogBoxProps> = ({ openDialog, onClose, userId }) => {
    console.log(userId)
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
        <DialogContent>
          {/* You can add more content here, like a confirmation message or warning */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Disagree</Button>
          <Button onClick={onClose} autoFocus>
             
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DialogBox;
