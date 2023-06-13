import { createSlice } from '@reduxjs/toolkit';

const recipesFromLocalStorage = localStorage.getItem('recipes')
  ? JSON.parse(localStorage.getItem('recipes') as string)
  : [];

const initialState = {
  recipes: recipesFromLocalStorage,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
});

export default recipesSlice.reducer;
