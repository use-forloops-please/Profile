import React, { useEffect, useState } from 'react';
import { getSkills, updateSkills } from '../api';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import '../App.css'; 

const Skills = () => {
  const [skills, setSkills] = useState('');
  const [open, setOpen] = useState(false);
  const [updatedSkills, setUpdatedSkills] = useState(''); 
  const [password, setPassword] = useState('');
  const [passwordPromptOpen, setPasswordPromptOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getSkills().then(response => {
      skills(response.data);
      setUpdatedSkills(response.data); 
    }).catch(error => {
      console.error('Error fetching about data', error);
    });
  }, []);

  const handleUpdate = () => {
    if (password === 'Password@1') {
      const updatedData = { skills: updatedSkills };
      updateSkills(updatedData).then(response => {
        setSkills(response.data);
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
    setUpdatedSkills(event.target.value);
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
        <h1>Skills</h1>
        <p>{skills}</p>
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
        <DialogTitle>Update Skills</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="about"
            label="About Info"
            type="text"
            fullWidth
            value={updatedSkills}
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

export default Skills;
