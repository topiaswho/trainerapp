import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

const Traininglist = () => {
    const [trainings, setTrainings] = useState([]);

    const columns = [

        { field: 'date', headerName: 'Date' },
        { field: 'duration', headerName: 'Duration' },
        { field: 'activity', headerName: 'Activity' }
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
                const trainingsData = responseData; // Adjust this based on the actual structure of your training data
                setTrainings(trainingsData);
            })
            .catch(error => {
                console.error(error);
                // Handle error or set an appropriate state
            });
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
