import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function AddBug() {

  const [open, setOpen] = React.useState(true);
  const [bugData, setBugData] = React.useState({
    status: '',
    title: '',
    description: '',
    deadline: '',
    user_id: '',
  });
  
  React.useEffect(() => {
    fetch('/userId')
      .then(response => response.json())
      .then(data => {
        const user_id = data.user_id;
        setBugData(bugData => ({ ...bugData, user_id: user_id }));
      });
  }, []);
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setBugData({
      ...bugData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
  fetch('/api/bugs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bugData),
  })
    .then((response) => response.json())
    .then((data) => {
      handleClose();
    })
    .catch((error) => {
    });
    console.log(bugData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Bug</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="status"
          label="Status"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="deadline"
          label="Deadline"
          type="date"
          fullWidth
          variant="standard"
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}