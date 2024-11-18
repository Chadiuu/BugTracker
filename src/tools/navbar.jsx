import React, { useState } from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import AddBug from './addBug';
import Overview from '../pages/Overview';
import MyBugs from '../pages/MyBugs';

const Navbar = () => {
  const [page, setPage] = useState('overview');
    const handleButtonClick2 = (newPage) => {
      setPage(newPage);
    };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => handleButtonClick2('overview')}>Overview</Button>
          <Button color="inherit" onClick={() => handleButtonClick2('mybugs')}>My Bugs</Button>
          <div style={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => handleButtonClick2('addBug')}>Add Bug</Button>
        </Toolbar>
      </AppBar>
      {page === 'overview' && <Overview/>}
      {page === 'mybugs' && <MyBugs/>}
      {page === 'addBug' && <AddBug/>}

    </div>
  );
  };

  export default Navbar;



