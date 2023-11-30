import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export default function AddCustomer(props) {
    const [customer, setCustomer] = useState(
        {firstname: '', lastname: '', 
    streetaddress: '', postcode: '', city: '', email: '', phone: '' });
    const [open, setOpen] = useState(false);

    // functions
const handleClose = (event, reason) => {
    if (reason != 'backdropClick')
    setOpen(false);

}

const handleInputChange = (event) => {
    setCustomer ({...customer, [event.target.name]: event.target.value});
}

const handleSave = () => {
    props.addCustomer(customer); 
    setOpen(false);
}
// return
return (
    <>
    <Button
    onClick={() => setOpen(true)}>New customer</Button>
    <Dialog
    open={open}
       onClose={handleClose} >
        <DialogTitle>New customer</DialogTitle>
        <DialogContent>
            <TextField
                label='First name'
                name='firstname'
                value={customer.firstname}
                onChange={handleInputChange}
            >
            </TextField>
            <TextField
                label='Last name'
                name='lastname'
                value={customer.lastname}
                onChange={handleInputChange}
            >
            </TextField>
            <TextField
                label='Street address'
                name='streetaddress'
                value={customer.streetaddress}
                onChange={handleInputChange}
            >
            </TextField>
            <TextField
                label='Postcode'
                name='postcode'
                value={customer.postcode}
                onChange={handleInputChange}
            >
            </TextField>
            <TextField
                label='City'
                name='city'
                value={customer.city}
                onChange={handleInputChange}
            >
            </TextField>
            <TextField
                label='Email'
                name='email'
                value={customer.email}
                onChange={handleInputChange}
            >
            </TextField>
            <TextField
                label='Phone number'
                name='phone'
                value={customer.phone}
                onChange={handleInputChange}
            >
            </TextField>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleSave}>Save</Button>
        </DialogActions>
    </Dialog>
    </>
);
}