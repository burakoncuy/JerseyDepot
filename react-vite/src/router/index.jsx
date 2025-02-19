import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import ItemList from '../components/ItemList/ItemList';
import ItemDetail from '../components/ItemDetail';
import ItemCreate from '../components/ItemCreate/ItemCreate';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>NOW JERSEY app is loading!</h1>,
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
      {
        path: "items/new",
        element: <ItemCreate />,
      },
    ],
  },
]);