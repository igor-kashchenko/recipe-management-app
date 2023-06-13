import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Recipe, Status, recipesInitialState } from '../types';
import { filterRecipes, mockDataFromApi } from '../utils.ts';

const recipesFromLocalStorage = localStorage.getItem('recipes')
  ? JSON.parse(localStorage.getItem('recipes') as string)
  : [];

const savedRecipesFromStorage = localStorage.getItem('savedRecipes')
  ? JSON.parse(localStorage.getItem('savedRecipes') || '')
  : [];

const favRecipesFromStorage = localStorage.getItem('favRecipes')
  ? JSON.parse(localStorage.getItem('favRecipes') || '')
  : [];

export const mockFetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = mockDataFromApi;

    const data = await Promise.resolve(response);

    localStorage.setItem('recipes', JSON.stringify(data));

    return data;
  }
);

const initialState: recipesInitialState = {
  recipes: recipesFromLocalStorage,
  filteredRecipes: recipesFromLocalStorage,
  status: Status.Idle,
  error: undefined,
  savedRecipes: savedRecipesFromStorage,
  favRecipes: favRecipesFromStorage,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    searchRecipe: (state, action: PayloadAction<string>) => {
      state.filteredRecipes = filterRecipes(state.recipes, action.payload);
    },
    setSearchToDefault: (state) => {
      state.filteredRecipes = recipesFromLocalStorage;
    },
    saveRecipe: (state, action: PayloadAction<Recipe>) => {
      const exist = state.savedRecipes.find(
        (recipe) => recipe.title === action.payload.title
      );
      if (!exist) {
        state.savedRecipes.push(action.payload);
        localStorage.setItem(
          'savedRecipes',
          JSON.stringify(state.savedRecipes)
        );
      }
    },
    favRecipe: (state, action: PayloadAction<Recipe>) => {
      const exist = state.favRecipes.find(
        (recipe) => recipe.title === action.payload.title
      );
      if (!exist) {
        state.favRecipes.push(action.payload);
        localStorage.setItem('favRecipes', JSON.stringify(state.favRecipes));
      }
    },
    removeSavedRecipe: (state, action: PayloadAction<string>) => {
      state.savedRecipes = state.savedRecipes.filter(
        (recipe) => recipe.title !== action.payload
      );
      localStorage.setItem('savedRecipes', JSON.stringify(state.savedRecipes));
    },
    removeFavRecipe: (state, action: PayloadAction<string>) => {
      state.favRecipes = state.favRecipes.filter(
        (recipe) => recipe.title !== action.payload
      );
      localStorage.setItem('favRecipes', JSON.stringify(state.favRecipes));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(mockFetchRecipes.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(mockFetchRecipes.fulfilled, (state, action) => {
        state.status = Status.Succeeded;
        state.recipes = action.payload;
      })
      .addCase(mockFetchRecipes.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.error.message;
      });
  },
});

export const {
  searchRecipe,
  setSearchToDefault,
  saveRecipe,
  favRecipe,
  removeFavRecipe,
  removeSavedRecipe,
} = recipesSlice.actions;

export default recipesSlice.reducer;
