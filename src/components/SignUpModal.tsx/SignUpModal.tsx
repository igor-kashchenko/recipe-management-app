import React, { FormEvent, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { FormErrors, User } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addUser, setCurrentUser, setError } from '../../redux/user';

type Props = {
  open: boolean;
  handleClose: () => void;
  handleCloseSignIn: () => void;
};

export const SignUpModal: React.FC<Props> = ({ open, handleClose, handleCloseSignIn }) => {
  const [newUserName, setNewUserName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.user.users);

  const handleSignUp = (event: FormEvent) => {
    event.preventDefault();
    dispatch(setError(null));

    const existingUser = users.find((user) => user.email === newEmail || user.userName === newUserName);

    if (existingUser) {
      dispatch(setError(FormErrors.DuplicateUser));

      return;
    } else {
      const newUserData: User = {
        userName: newUserName,
        email: newEmail,
        password: newPassword,
      };

      dispatch(addUser(newUserData));
      dispatch(setCurrentUser(newUserData));

      setNewUserName('');
      setNewEmail('');
      setNewPassword('');

      handleClose();
      handleCloseSignIn();
    }

    const newUserData: User = {
      userName: newUserName,
      email: newEmail,
      password: newPassword,
    };

    dispatch(addUser(newUserData));
    dispatch(setCurrentUser(newUserData));

    setNewUserName('');
    setNewEmail('');
    setNewPassword('');

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSignUp}>
        <DialogTitle>Sign up</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
            required
          />

          <TextField
            margin="dense"
            label="Username"
            fullWidth
            value={newUserName}
            onChange={(event) => setNewUserName(event.target.value)}
            required
          />

          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            inputProps={{ minLength: 6 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button type="submit">Sign up</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
