import React, { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Snackbar, Button } from "@mui/material";

const Customerlist = () => {
    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    const columns = [
        { field: 'firstname', headerName: 'First Name' },
        { field: 'lastname', headerName: 'Last Name' },
        { field: 'streetaddress', headerName: 'Street Address' },
        { field: 'postcode', headerName: 'Postcode' },
        { field: 'city', headerName: 'City' },
        { field: 'email', headerName: 'Email' },
        { field: 'phone', headerName: 'Phone' },
        {
            headerName: 'Actions',
            cellRenderer: params => (
                <Button size="small" color="error" onClick={() => deleteCustomer(params)}>
                    Delete
                </Button>
            ),
            width: 120,
        }
    ];

    useEffect(() => {
        getCustomers();
    }, []);

    const REST_URL = "http://traineeapp.azurewebsites.net/api/customers";

    const getCustomers = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                const customersData = responseData.content;
                setCustomers(customersData);
            })
            .catch(error => {
                console.error(error);
                // Handle error or set an appropriate state
            });
    }

    const deleteCustomer = (params) => {
        console.log("params: " + params.data._links.customer.href);
        fetch(params.data._links.customer.href, { method: 'DELETE' })
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

    return (
        <>
            <div>
                <div className="ag-theme-material" style={{ height: "700px", width: "100%", margin: "auto" }}>
                    <AgGridReact
                        rowData={customers}
                        columnDefs={columns}
                        pagination={true}
                        paginationPageSize={10}
                    >
                    </AgGridReact>
                </div>
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
