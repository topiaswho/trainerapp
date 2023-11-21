
import { Link, Outlet } from 'react-router-dom';

import { AppBar, Typography } from '@mui/material';

function App() {
  return (
    
      <>

        
        <AppBar position='relative'>
          <Typography variant='h5'>
            Training app
          </Typography>
        </AppBar>
        <nav>
          <Link to={"/"}>Customerlist</Link>
          <Link to={"/Traininglist"}>Traininglist</Link>
        </nav>
        <Outlet />
      </>
    
  );
}

export default App;
