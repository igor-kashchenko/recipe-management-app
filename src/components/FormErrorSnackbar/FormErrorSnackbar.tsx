import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setError } from '../../redux/user';

export const ErrorSnackbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.user.error);

  const handleClose = ( event?: React.SyntheticEvent | Event,
    reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    if (error) {
      dispatch(setError(null));
    }
  };

  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
