import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import { Projects, ProjectsById } from '../components/Projects/index'
import Layout from './Layout';
import AuthLayout from "./AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout with reg navbar
    children: [
      // Other routes that need the navbar
    ],
  },
  {
    element: <AuthLayout />, // Layout without reg navbar
    children: [
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "/signup",
        element: <SignupFormPage />,
      },
      {
        path: "/projects",
        element: <Projects />
      },
      {
        path: "/projects/:projectId",
        element: <ProjectsById />
      }
    ],
  },
]);
