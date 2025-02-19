import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import ItemList from '../components/ItemList/ItemList';
import ItemDetail from '../components/ItemDetail';
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
        path: "items",
        element: <ItemList />,
      },
      {
        path: "items/:id",
        element: <ItemDetail />,
      },
    ],
  },
]);