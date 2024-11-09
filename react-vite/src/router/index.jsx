import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import AuthLayout from "./AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout with the navigation bar
    children: [
      {
        index: true,
        element: <h1>Welcome!</h1>,
      },
      // Other routes that need the navbar
    ],
  },
  {
    path: "/", // Layout without the navigation bar
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
