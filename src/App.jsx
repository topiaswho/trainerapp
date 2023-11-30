import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Typography, Button } from '@mui/material';
import './App.css';
function App() {
  return (
    <>
      <AppBar position='relative'>
        <Typography variant='h5'>
          Training app
        </Typography>
      </AppBar>
      <nav>
        <Button component={Link} to="/">
          Customerlist
        </Button>
        <Button component={Link} to="/Traininglist">
          Traininglist
        </Button>
        <Button component={Link} to="/calendar">
          Calendar
        </Button>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
