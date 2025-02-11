import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';

describe('Navbar Component', () => {
  it('renders the Navbar with Home and Login buttons', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('renders the Dashboard button when logged in', () => {
    // Mock the Redux state to simulate a logged-in user
    store.dispatch({ type: 'auth/login' });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});