import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

function EditCustomer(props) {
  const [editedCustomer, setEditedCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '' 
  });

  const [open, setOpen] = useState(false); // Is edit dialog open?


  const handleClickOpen = () => {
    setEditedCustomer({
      firstname: props.params.data.firstname,
      lastname: props.params.data.lastname,
      streetaddress: props.params.data.streetaddress,
      postcode: props.params.data.postcode,
      city: props.params.data.city,
      email: props.params.data.email,
      phone: props.params.data.phone,

        
    })
    setOpen(true);
  };

  const handleInputChange = (event) => {
    setEditedCustomer({
      ...editedCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    const editUrl = props.params.data.links[0].href;
    props.onSave(editUrl, editedCustomer);
    
    setOpen(false);
  };

  const handleClose = (event, reason) => {
    if (reason != 'backdropClick'){
      
      setOpen(false); 
    }
  };

  return (
    <div>
    <Button
    onClick={() => handleClickOpen()}>Edit</Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit customer</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          name="firstname"
          value={editedCustomer.firstname}
          onChange={handleInputChange}
        />
        <TextField
          label="Last Name"
          name="lastname"
          value={editedCustomer.lastname}
          onChange={handleInputChange}
        >
         </TextField>
            <TextField
                label='Street address'
                name='streetaddress'
                value={editedCustomer.streetaddress}
                onChange={handleInputChange}
            >
            </TextField>
            <TextField
                label='Postcode'
                name='postcode'
                value={editedCustomer.postcode}
                onChange={handleInputChange}
            >
            </TextField>
            <TextField
                label='City'
                name='city'
                value={editedCustomer.city}
                onChange={handleInputChange}
            >
            </TextField>
            <TextField
                label='Email'
                name='email'
                value={editedCustomer.email}
                onChange={handleInputChange}
            >
            </TextField>
            <TextField
                label='Phone number'
                name='phone'
                value={editedCustomer.phone}
                onChange={handleInputChange}
            >
            </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
    </div>
  );
}

export default EditCustomer;
