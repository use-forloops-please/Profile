import React, { useEffect, useState } from 'react';
import { getContact, updateContact } from '../api';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import Projects from './Projects';
import EditIcon from '@mui/icons-material/Edit';
import '../App.css';

const Contact = () => {
  const [contact, setContact] = useState('');
  const [open, setOpen] = useState(false);
  const [updatedContact, setUpdatedContact] = useState('');
  const [password, setPassword] = useState('');
  const [passwordPromptOpen, setPasswordPromptOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getContact().then(response => {
      setContact(response.data);
      setUpdatedContact(response.data); 
    }).catch(error => {
      console.error('Error fetching contact data', error);
    });
  }, []);

  const handleUpdate = () => {
    if (password === 'Password@1') {
      const updatedData = { contact: updatedContact };
      updateContact(updatedData).then(response => {
        setContact(response.data);
        setOpen(false);
      }).catch(error => {
        console.error('Error updating about data', error);
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
    setUpdatedContact(event.target.value);
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
        <h1>Contact</h1>
        <p>{contact}</p>
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
        <DialogTitle>Update Contact info </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="about"
            label="About Info"
            type="text"
            fullWidth
            value={updatedContact}
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

export default Contact;
