import React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Typography, ButtonBase, Dialog, DialogContent, TextField, Button } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

const styles = {
    root: {
      backgroundColor: '#e0f7fa',
      width: 300,
      borderRadius: 16,
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      border: '1px solid black', // add border herey
    },
    title: {
      fontWeight: 'bold',
      marginBottom: 8,
    },
    bugIcon: {
      position: 'absolute',
      top: -20,
      right: -20,
      fontSize: 60,
      color: '#ff9800',
    },
  };

const BugCard = ({ bug, onRefresh}) => {
    const date = new Date(bug.deadline);

    // Format the date in your local time zone
    const formattedDate = date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(bug.title);
    const [description, setDescription] = useState(bug.description);
    const [deadline, setDeadline] = useState(bug.deadline);
    const [status, setStatus] = useState(bug.status);
    const [bugId, setBugId] = useState(bug.id);
    const [error, setError] = useState('');

    // const handleSubmit = () => {
    //   fetch(`/bugs/${bug.user_id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ title, description, deadline, status , bugId})
    //   });
    //   onRefresh();
    //   setOpen(false);
    //   };



    const handleSubmit = () => {
      fetch(`/bugs/${bug.user_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, deadline, status , bugId})
      })
      .then((response) => {
      if (!response.ok) {
      throw new Error('An error occurred while updating the bug');
      }
      return response.text();
      })
      .then((data) => {
      // handle successful update
      onRefresh();
      setOpen(false);
      })
      .catch((error) => {
      // handle error
      setError('An error occurred while updating the bug');
      });
     };
     



    return (
      <>
        <ButtonBase onClick={() => setOpen(true)}>
          <Card style={styles.root}>
            <CardContent>
              <Typography variant="h6">{bug.title}</Typography>
              <Typography variant="body2">{bug.user_name}</Typography>
              <Typography variant="body2">{bug.status}</Typography>
              <Typography variant="body2">{formattedDate}</Typography>
            </CardContent>
            <span style={styles.bugIcon}>🐛</span>
          </Card>
        </ButtonBase>
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xl">
          <DialogContent >
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} />
              </Grid>
              <Grid item>
                <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} multiline rows={4} />
              </Grid>
              <Grid item>
                <TextField label="Deadline" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
              </Grid>
              <Grid item>
                <TextField label="Status" value={status} onChange={e => setStatus(e.target.value)} />
              </Grid>
              {error && (
              <FormHelperText error>{error}</FormHelperText>
              )}
            </Grid>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogContent>
        </Dialog>
      </>
    );
  
};
export default BugCard;
