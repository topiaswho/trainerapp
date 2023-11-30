import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Snackbar, Button } from "@mui/material";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";


const Customerlist = () => {
    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);
    const [editCustomer, setEditCustomer] = useState(null);

    const columns = [
        { field: 'firstname', headerName: 'First Name', sortable: true, filter: true },
        { field: 'lastname', headerName: 'Last Name', sortable: true, filter: true },
        { field: 'streetaddress', headerName: 'Street Address', sortable: true, filter: true },
        { field: 'postcode', headerName: 'Postcode', sortable: true, filter: true },
        { field: 'city', headerName: 'City', sortable: true, filter: true },
        { field: 'email', headerName: 'Email', sortable: true, filter: true },
        { field: 'phone', headerName: 'Phone', sortable: true, filter: true },
        {
          headerName: 'Actions',
          cellRenderer: params => (
            <div>
              <Button size="small" onClick={() => handleEdit(params.data)}>Edit</Button>
              <Button size="small" color="error" onClick={() => deleteCustomer(params)}>Delete</Button>
            </div>
          ),
          width: 150,
        },
      ];
      

    useEffect(() => {
        getCustomers();
    }, []);

    const REST_URL = "http://traineeapp.azurewebsites.net/api/customers";

    const getCustomers = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                const customersData = responseData.content;
                setCustomers(customersData);
            })
            .catch(error => {
                console.error(error);
                // Handle error or set an appropriate state
            });
    }

    const deleteCustomer = (params) => {
        console.log(params.data);
        fetch(params.data.links[0].href, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setMsg('Customer is deleted');
                    setOpen(true);
                    getCustomers();
                } else {
                    alert('Something went wrong');
                }
            })
            .catch(error => console.error(error));
    }

    const addCustomer = (customer) => {
        fetch(REST_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer),
        })
            .then(response => {
                if (response.ok) {
                    getCustomers();
                } else {
                    alert('something went wrong');
                }
            })
            .catch(err => console.error(err));
    };
    
    const handleEdit = (customer) => {
        setEditCustomer({ ...customer });
        setOpen(true);
    }
    

    const handleSave = () => {

        fetch(editCustomer.links[0].href, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editCustomer),
        })
        .then(response => {
            if (response.ok) {
                setMsg('Customer is updated');
                setOpen(false);
                getCustomers();
            } else {
                alert('Something went wrong');
            }
        })
        .catch(error => console.error(error));
    }

    return (
        <>
        <AddCustomer addCustomer={addCustomer} 
       EditCustomer editCustomer={editCustomer} onSave={handleSave} 
       onCancel={() => setOpen(false)} open={open}/>
    <div className="ag-theme-material"
    style={{height: "700px", width: "100%", margin: "auto"}}>
            
                
                    <AgGridReact
                        rowData={customers}
                        columnDefs={columns}
                        pagination={true}
                        paginationPageSize={10}
                        >
                </AgGridReact>
                
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                />
            </div>
        </>
    );

    } 
export default Customerlist;
    