import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { SignInModal } from '../SignInModal';
import { SignUpModal } from '../SignUpModal.tsx';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { UserProfile } from '../UserProfile';
import { setCurrentUser } from '../../redux/user';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSigUpOpen, setIsSignUpOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const isUserLoggedIn = useAppSelector((state) => state.user.currentUser);
  const userName = useAppSelector((state) => state.user.currentUser?.userName);

  const handleOpenSignIn = () => {
    setIsSignInOpen(true);
  };

  const handleCloseSignIn = () => {
    setIsSignInOpen(false);
  };

  const handleOpenSignUp = () => {
    setIsSignUpOpen(true);
  };

  const handleCloseSignUp = () => {
    setIsSignUpOpen(false);
  };

  const handleSignOut = () => {
    dispatch(setCurrentUser(null));

    navigate('/');
  };

  return (
    <AppBar
      position="static"
      sx={{
        borderRadius: '8px 8px 0 0',
        backgroundColor: 'primary',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 4,
        py: 1,
      }}
    >
      <Button color="secondary" href="/">
        <LunchDiningIcon sx={{ mr: 1 }} />

        <Typography variant="body2" lineHeight={'22px'}>
          Recipe App
        </Typography>
      </Button>

      <Box display={'flex'}>
        {isUserLoggedIn && (
          <>
            <Button sx={{ mr: 2 }} href="added" color="secondary">
              <BookmarkAddedIcon sx={{ mr: 1 }} />

              <Typography variant="body2">My Saved</Typography>
            </Button>

            <Button sx={{ mr: 2 }} href="favourites" color="secondary">
              <FavoriteBorderIcon sx={{ mr: 1 }} />

              <Typography variant="body2">My Favs</Typography>
            </Button>
          </>
        )}

        {isUserLoggedIn && <UserProfile userName={userName} />}

        <Button
          variant="outlined"
          color="secondary"
          sx={{ px: 1 }}
          onClick={isUserLoggedIn ? handleSignOut : handleOpenSignIn}
        >
          {isUserLoggedIn ? (
            <LogoutIcon sx={{ mr: 1 }} />
          ) : (
            <LoginIcon sx={{ mr: 1 }} />
          )}

          <Typography variant="body2">
            {isUserLoggedIn ? 'Sign out' : 'Sign in'}
          </Typography>
        </Button>
      </Box>

      <SignInModal
        open={isSignInOpen}
        handleClose={handleCloseSignIn}
        handleOpenSignUp={handleOpenSignUp}
      />
      <SignUpModal
        open={isSigUpOpen}
        handleClose={handleCloseSignUp}
        handleCloseSignIn={handleCloseSignIn}
      />
    </AppBar>
  );
};
