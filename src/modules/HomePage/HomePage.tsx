import Grid from '@mui/material/Grid';
import React from 'react';
import { GeneralRecipesList } from '../../components/GeneralRecipesList';

export const HomePage: React.FC = () => {
  return (
    <Grid container columnSpacing={2} sx={{m: 0, p: 4 }}>
      <Grid item xs={3}>
        <h1>SearchForm</h1>
      </Grid>

      <Grid item xs={9}>
        <GeneralRecipesList />
      </Grid>
    </Grid>
  );
};
