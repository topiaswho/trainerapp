import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


export default function AddTraining(props) {
  const [training, setTraining] = useState({
    date: new Date(),
    duration: '',
    activity: ''
  });
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') setOpen(false);
  };

  const handleInputChange = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => {
    setTraining({ ...training, date: date ? date.toDate() : null });
  };

  const handleSave = () => {
    props.addTraining(training);
    setOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <>
        <Button onClick={() => setOpen(true)}>New training</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New training</DialogTitle>
          <DialogContent>
          <DatePicker
  label="Date"
  value={training.date ? dayjs(training.date) : null}
  onChange={handleDateChange}
/>
            <TextField
              label='Duration'
              name='duration'
              value={training.duration}
              onChange={handleInputChange}
            />
            <TextField
              label='Activity'
              name='activity'
              value={training.activity}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </>
    </LocalizationProvider>
  );
}
