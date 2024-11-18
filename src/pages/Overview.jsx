import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import BugCard from '../tools/BugCard';
import {  Button, Menu, MenuItem } from '@mui/material';
const styles = {
  bugCard: {
    margin: 8,
  },
  filterButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 8,
  },
};
function Overview() {
  const [bugs, setBugs] = useState([]);
  const [filter, setFilter] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    handleClose();
  };

  useEffect(() => {
    fetchBugs();
    }, []);

    const fetchBugs = async () => {
    const response = await fetch('/bugs');
    const data = await response.json();
    setBugs(data);
    };

  return (
    <>
      <Box style={styles.filterButtonContainer}>
        <Button onClick={handleClick}>Filter</Button>
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleFilterChange('deadline')}>Deadline Date</MenuItem>
        <MenuItem onClick={() => handleFilterChange('status')}>Status (Active)</MenuItem>
        <MenuItem onClick={() => handleFilterChange('modified')}>Last Modified</MenuItem>
      </Menu>
      {}
      <Box display="flex" flexWrap="wrap">
        {bugs
          .filter((bug) => {
            if (!filter) return true;
            if (filter === 'deadline') return bug.deadline;
            if (filter === 'status') return bug.status === 'active';
            if (filter === 'modified') return bug.last_updated; 
          })
          .sort((a, b) => {
            if (filter === 'deadline') return new Date(b.deadline) - new Date(a.deadline);
            if (filter === 'modified') return new Date(b.last_updated) - new Date(a.last_updated);
            return 0;
          })
          .map((bug) => (
            <Box key={bug.id} style={styles.bugCard} >
              <BugCard bug={bug} onRefresh={fetchBugs} />
            </Box>
          ))}
      </Box>
    </>
  );
}

export default Overview;
