import React, { useEffect } from 'react';
import { AppContainer } from './components/AppContainer';
import { HomePage } from './modules/HomePage';
import { Navbar } from './components/Navbar';
import { PageNotFound } from './modules/PageNotFound';
import { FavPage } from './modules/FavPage';
import { ErrorSnackbar } from './components/FormErrorSnackbar';
import { useAppDispatch } from './redux/hooks';
import { mockFetchRecipes } from './redux/recipes';
import { SavedPage } from './modules/SavedPage';
import { Navigate, useRoutes } from 'react-router-dom';


export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const routes = [
    { path: '/', element: <HomePage /> },
    { path: 'favourites', element: <FavPage /> },
    { path: 'added', element: <SavedPage /> },
    { path: 'home', element: <Navigate to="/" replace /> },
    { path: '*', element: <PageNotFound /> }
  ];

  useEffect(() => {
    dispatch(mockFetchRecipes());
  }, [dispatch]);

  const element = useRoutes(routes);

  return (
    <AppContainer>
      <Navbar />

      {element}

      <ErrorSnackbar />
    </AppContainer>
  );
};

