import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LandingPageLayout from './layouts/LandingPageLayout';
import { ThemeProvider } from 'styled-components';
import theme from './utils/theme';
import AddUser from './pages/AddUser';
import Edituser from './components/EditUser';

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
        },
        {
          path: 'addUser',
          element: <AddUser />
        },
        {
          path: 'user/:id',
          element: <Edituser />
        },
        {
          path: '*',
          element: <div>404 Not Found</div>, // Catch-all route for undefined paths
        }
      ],
    }
  ]);

  return <ThemeProvider theme={theme}><RouterProvider router={router} /></ThemeProvider>;
}

export default App;
