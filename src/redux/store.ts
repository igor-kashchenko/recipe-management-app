import { configureStore } from '@reduxjs/toolkit';
import recipesSlice from './recipes';
import userSlice from './user';

export const store = configureStore({
  reducer: {
    recipes: recipesSlice,
    user: userSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
