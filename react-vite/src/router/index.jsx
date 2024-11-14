import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import { Projects, ProjectsById, CreateProject, UpdateProject, ProjectsByCategory } from '../components/Projects/index'
import Layout from './Layout';
import HomePage from '../components/HomePage/Homepage';
import AuthLayout from './AuthLayout'
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout with reg navbar
    children: [
      {
        element: <AuthLayout />, // Layout without reg navbar
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "login",
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
          },
          {
            path: "/projects/create",
            element: <CreateProject />
          },
          {
            path: '/projects/:projectId/update',
            element: <UpdateProject />
          },
          {
            path: '/categories/:categoryId/projects',
            element: <ProjectsByCategory />
          },

        ],
      }
    ]
  }
])