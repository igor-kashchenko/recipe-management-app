import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppContainer } from './components/AppContainer';
import { HomePage } from './modules/HomePage';
import { Navbar } from './components/Navbar';
import { PageNotFound } from './modules/PageNotFound';
import { FavPage } from './modules/FavPage';
import { ErrorSnackbar } from './components/FormErrorSnackbar';

const App: React.FC = () => {
  return (
    <AppContainer>
      <Navbar />

      <Routes>
        <Route path='*' element={<PageNotFound />} />

        <Route path='/' element={<HomePage />} />

        <Route path='/favourites' element={<FavPage />} />

        <Route path='/home' element={<Navigate to='/' replace />} />
      </Routes>

      <ErrorSnackbar />
    </AppContainer>
  );
};

export default App;
