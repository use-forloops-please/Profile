import React, { useEffect, useState } from 'react';
import { getProjects, updateProjects } from '../api';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import '../App.css'; 

const Projects = () => {
  const [projects, setProjects] = useState('');
  const [open, setOpen] = useState(false);
  const [updatedProjects, setUpdatedProjects] = useState(''); 
  const [password, setPassword] = useState('');
  const [passwordPromptOpen, setPasswordPromptOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getProjects().then(response => {
      projects(response.data);
      setUpdatedProjects(response.data); 
    }).catch(error => {
      console.error('Error fetching about data', error);
    });
  }, []);

  const handleUpdate = () => {
    if (password === 'Password@1') {
      const updatedData = { projects: updatedProjects };
      updateProjects(updatedData).then(response => {
        setProjects(response.data);
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
    setUpdatedProjects(event.target.value);
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
        <h1>Projects</h1>
        <p>{projects}</p>
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
        <DialogTitle>Update Projects</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="about"
            label="About Info"
            type="text"
            fullWidth
            value={updatedProjects}
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

export default Projects;
