import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import { Projects, ProjectsById, CreateProject, UpdateProject, ProjectsByCategory } from '../components/Projects/index'
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
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
  },
]);