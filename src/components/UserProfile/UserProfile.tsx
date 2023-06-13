import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type Props = {
  userName: string | undefined;
};

export const UserProfile: React.FC<Props> = ({ userName }) => {
  return (
    <Box display={'flex'} alignItems={'center'} mr={2}>
      <AccountCircleIcon sx={{ mr: 1 }} />

      <Typography>{userName}</Typography>
    </Box>
  );
};
