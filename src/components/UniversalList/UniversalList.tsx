import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Category, CookingTime, Recipe } from '../../types';
import { filterRecipe } from '../../utils.ts';
import { RecipeCard } from '../RecipeCard';

type Props = {
  recipes: Recipe[];
};

export const UniversalList: React.FC<Props> = ({ recipes }) => {
  const [cookingTimeFilter, setCookingTimeFilter] = useState<CookingTime>(
    CookingTime.ALL
  );
  const [categoryFilter, setCategoryFilter] = useState<Category>(Category.ALL);

  const isListEmpty = recipes.length === 0;

  const handleCookingTimeFilterChange = (event: SelectChangeEvent) => {
    setCookingTimeFilter(event.target.value as CookingTime);
  };

  const handleCategoryFilterChange = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value as Category);
  };

  const filteredRecipes = filterRecipe(
    recipes,
    categoryFilter,
    cookingTimeFilter
  );

  const handleResetFilters = () => {
    setCategoryFilter(Category.ALL);
    setCookingTimeFilter(CookingTime.ALL);
  };

  return (
    <Grid item xs={9}>
      <Paper
        sx={{ p: 2, height: '750px', overflow: 'auto' }}
        variant="outlined"
      >
        {isListEmpty ? (
          <Typography
            variant="h4"
            height={'100%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            No result.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={6} mb={2}>
              <Select
                value={cookingTimeFilter}
                onChange={handleCookingTimeFilterChange}
                fullWidth
              >
                <MenuItem value={CookingTime.ALL}>All</MenuItem>

                <MenuItem value={CookingTime.ASC}>Ascending</MenuItem>

                <MenuItem value={CookingTime.DESC}>Descending</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={5} mb={2}>
              <Select
                value={categoryFilter}
                onChange={handleCategoryFilterChange}
                fullWidth
              >
                <MenuItem value={Category.ALL}>All Categories</MenuItem>

                <MenuItem value={Category.DESSERT}>Dessert</MenuItem>

                <MenuItem value={Category.DINNER}>Dinner</MenuItem>
                
                <MenuItem value={Category.BREAKFAST}>Breakfast</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={1} display={'flex'} alignItems={'center'} mb={2}>
              <CloseIcon
                sx={{ cursor: 'pointer' }}
                titleAccess="reset filters"
                onClick={handleResetFilters}
              />
            </Grid>

            {filteredRecipes.map((recipe) => (
              <Grid item xs={4} key={recipe.title}>
                <RecipeCard recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Grid>
  );
};
