import React from 'react';
import { TranslationProvider } from './translations/TranslationContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import RequireAuth from './components/RequireAuth';
import Navbar from './components/Navbar';
import CheckAuth from './components/CheckAuth';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <TranslationProvider>
          <CheckAuth />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
              />
          </Routes>
        </TranslationProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;