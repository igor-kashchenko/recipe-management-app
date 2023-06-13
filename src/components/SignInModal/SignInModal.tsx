import React, { FormEvent, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCurrentUser, setError } from '../../redux/user';
import { FormErrors } from '../../types';

type Props = {
  open: boolean;
  handleClose: () => void;
  handleOpenSignUp: () => void;
};

export const SignInModal: React.FC<Props> = ({
  open,
  handleClose,
  handleOpenSignUp,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);

  const handleSignIn = (event: FormEvent) => {
    event.preventDefault();

    const foundUser = users.find(
      (user) => email === user.email && password === user.password
    );

    if (foundUser) {
      dispatch(setCurrentUser(foundUser));

      setEmail('');
      setPassword('');

      handleClose();
    } else {
      dispatch(setError(FormErrors.InvalidCredentials));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSignIn}>
        <DialogTitle>Sign in</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            inputProps={{ minLength: 6 }}
          />

          <Typography
            mt={2}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            Don&apos;t have account ?
            <Button
              variant="outlined"
              sx={{ textTransform: 'capitalize' }}
              onClick={handleOpenSignUp}
            >
              Sign up
            </Button>
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button type="submit">Sign in</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
