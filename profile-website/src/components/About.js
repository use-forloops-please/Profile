import React, { useEffect, useState } from 'react';
import { getAbout, updateAbout } from '../api';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton  } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import '../App.css'; 

const About = () => {
  const [about, setAbout] = useState('');
  const [open, setOpen] = useState(false);
  const [updatedAbout, setUpdatedAbout] = useState('');
  const [password, setPassword] = useState('');
  const [passwordPromptOpen, setPasswordPromptOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getAbout().then(response => {
      setAbout(response.data);
    }).catch(error => {
      console.error('Error fetching about data', error);
    });
  }, []);

  const handleUpdate = () => {
    if (password === 'Password@1') {
      const updatedData = { aboutText: updatedAbout };
      console.log('Sending update:', updatedData);
      updateAbout(updatedData).then(response => {
        console.log('Update response:', response.data);
        setAbout(response.data);
        setOpen(false);
      }).catch(error => {
        console.error('Error updating about data', error.response?.data || error.message);
      });
    } else {
      setError('Incorrect password');
    }
  };

  const handleClickOpen = () => {
    setPasswordPromptOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPasswordPromptOpen(false);
    setError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleChange = (event) => {
    setUpdatedAbout(event.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === 'Password@1') { 
      setPasswordPromptOpen(false);
      setOpen(true);
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="section-container">
      <div className="section-content">
        <h1>About</h1>
        <p>{about}</p>
      </div>
      <IconButton color="primary" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={passwordPromptOpen} onClose={handleClose}>
        <DialogTitle>Enter Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePasswordSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update About Info</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="about"
            label="About Info"
            type="text"
            fullWidth
            value={updatedAbout}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default About;
