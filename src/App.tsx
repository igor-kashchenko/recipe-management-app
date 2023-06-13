import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppContainer } from './components/AppContainer';
import { HomePage } from './modules/HomePage';
import { Navbar } from './components/Navbar';
import { PageNotFound } from './modules/PageNotFound';
import { FavPage } from './modules/FavPage';
import { ErrorSnackbar } from './components/FormErrorSnackbar';
import { useAppDispatch } from './redux/hooks';
import { mockFetchRecipes } from './redux/recipes';
import { SavedPage } from './modules/SavedPage';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(mockFetchRecipes());
  }, [dispatch]);

  return (
    <AppContainer>
      <Navbar />

      <Routes>
        <Route path='*' element={<PageNotFound />} />

        <Route path='/' element={<HomePage />} />

        <Route path='favourites' element={<FavPage />} />

        <Route path='added' element={<SavedPage />} />

        <Route path='home' element={<Navigate to='/' replace />} />
      </Routes>

      <ErrorSnackbar />
    </AppContainer>
  );
};

