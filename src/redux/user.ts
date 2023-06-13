import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormErrors, User, usersInitialState } from '../types';

const usersFromLocalStorage = localStorage.getItem('users')
  ? JSON.parse(localStorage.getItem('users') as string)
  : [];

const currentUserFromLocalStorage = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') as string)
  : null;

const initialState: usersInitialState = {
  users: usersFromLocalStorage,
  currentUser: currentUserFromLocalStorage,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    setCurrentUser(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    },
    setError(state, action: PayloadAction<FormErrors | null>) {
      state.error = action.payload;
    }
  },
});

export const { addUser, setCurrentUser, setError } = userSlice.actions;

export default userSlice.reducer;
