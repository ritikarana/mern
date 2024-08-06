import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LandingPageLayout from './layouts/LandingPageLayout';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPageLayout />,
      children: [
        {
          path: '/',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          path: 'dashboard',
          element: <Dashboard />
        }
      ],
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
