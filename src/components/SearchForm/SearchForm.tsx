import React, { FormEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useAppDispatch } from '../../redux/hooks';
import { searchRecipe, setSearchToDefault } from '../../redux/recipes';

export const SearchForm: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useAppDispatch();

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(searchRecipe(searchQuery));

    setSearchQuery('');
  };

  const handleResetInput = (event: FormEvent) => {
    event.preventDefault();

    dispatch(setSearchToDefault());
  };

  return (
    <Grid item xs={3}>
      <form onSubmit={handleSearchSubmit}>
        <Paper
          sx={{ display: 'flex', flexDirection: 'column', p: 2 }}
          elevation={5}
        >
          <TextField
            label="Title or Ingredient"
            sx={{ mb: 2 }}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

          <Box display={'flex'}>
            <Button
              variant="outlined"
              type="reset"
              sx={{ flexGrow: 1, mr: 1 }}
              onClick={handleResetInput}
            >
              Reset
            </Button>

            <Button type="submit" variant="contained" sx={{ flexGrow: 1 }}>
              Submit
            </Button>
          </Box>
        </Paper>
      </form>
    </Grid>
  );
};
