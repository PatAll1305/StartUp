import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import { Projects, ProjectsById, CreateProject, UpdateProject, ProjectsByCategory } from '../components/Projects/index';
import Layout from './Layout';
import HomePage from '../components/HomePage/Homepage';
import AuthLayout from './AuthLayout';
import { Rewards, CreateRewards, EditReward } from '../components/Rewards/index';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout with regular navbar
    children: [
      {
        path: "/",
        element: <HomePage />,
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
        path: "/projects/:projectId/update",
        element: <UpdateProject />
      },
      {
        path: "/categories/:categoryId/projects",
        element: <ProjectsByCategory />
      },
      {
        path: "/projects/:projectId/rewards",
        element: <Rewards />
      },
      {
        path: 'projects/:projectId/rewards/create',
        element: <CreateRewards />
      },
      {
        path: 'projects/:projectId/rewards/:rewardId/edit',
        element: <EditReward />
      }
    ],
  },
  {
    element: <AuthLayout />, // Layout without regular navbar, only for auth routes
    children: [
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "/signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
