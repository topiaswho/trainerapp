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

  useEffect(() => {
    setEditedCustomer(props.customer);
  }, [props.customer]);

  const handleInputChange = (event) => {
    setEditedCustomer({
      ...editedCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    props.onSave(editedCustomer);
    props.onClose();  // Close the dialog when saving
  };

  const handleClose = () => {
    props.onClose();  // Close the dialog without saving
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>Edit customer</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          name="firstname"
          value={editedCustomer.firstname || ""}
          onChange={handleInputChange}
        />
        <TextField
          label="Last Name"
          name="lastname"
          value={editedCustomer.lastname || ""}
          onChange={handleInputChange}
        />
        {/* Add more fields as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCustomer;
