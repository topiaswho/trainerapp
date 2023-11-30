import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Snackbar, Button } from "@mui/material";
const Traininglist = () => {
    const [trainings, setTrainings] = useState([]);

    const columns = [

        { field: 'date', headerName: 'Date', sortable: true, filter: true},
        { field: 'duration', headerName: 'Duration', sortable: true, filter: true },
        { field: 'activity', headerName: 'Activity', sortable: true, filter: true},
        { field: 'customer.lastname', headerName: 'Last name', sortable: true, filter: true },
        { field: 'customer.firstname', headerName: 'First name', sortable: true, filter: true },

        {
            headerName: 'Actions',
            cellRenderer: params => (
              <div>
                <Button size="small" color="error" onClick={() => deleteTrainings(params)}>Delete</Button>
              </div>
            ),
            width: 150,
          },
    ];
    
    useEffect(() => {
        getTrainings();
    }, []);

    const REST_URL = "https://traineeapp.azurewebsites.net/gettrainings";

    const getTrainings = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                const trainingsData = responseData; 
                setTrainings(trainingsData);
            })
            .catch(error => {
                console.error(error);
                
            });
    }

    const deleteTrainings = (params) => {
        console.log(params.data);
        fetch(params.data.links[0].href, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setMsg('Training is deleted');
                    setOpen(true);
                    getTrainings();
                } else {
                    alert('Something went wrong');
                }
    })
    .catch(error => console.error(error));
    }
    return (
        <div className="ag-theme-material" style={{ height: "700px", width: "100%", margin: "auto" }}>
            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
            >
            </AgGridReact>
        </div>
    );
}

export default Traininglist;
