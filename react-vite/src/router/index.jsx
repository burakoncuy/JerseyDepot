import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import ItemList from '../components/ItemList/ItemList';
import ItemDetail from '../components/ItemDetail';
import ItemCreate from '../components/ItemCreate/ItemCreate';
import ItemUpdate from '../components/ItemUpdate/ItemUpdate';
import ItemDelete from '../components/ItemDelete';
import ItemCurrent from '../components/ItemCurrent';
import Favorite from '../components/Favorite/Favorite';
import ReviewList from '../components/ReviewList';
import AddReview from '../components/ReviewAdd/ReviewAdd';
import ReviewUpdate from '../components/ReviewUpdate';
import ReviewDelete from '../components/ReviewDelete';
import ReviewByCurrentUser from '../components/ReviewByCurrentUser';
import LandingPage from '../components/LandingPage';
// import HomePage from '../components/HomePage';
import OrderList from '../components/Order/Order';
import OrderDetail from '../components/OrderDetail';
import Cart from '../components/Cart';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage/>,
      },
      // {
      //   path: "home",
      //   element: <HomePage/>,
      // },

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
      {
        path: "items/:id/update",
        element: <ItemUpdate />,
      },
      {
        path: "items/:id/delete",
        element: <ItemDelete />,
      },
      {
        path: "items/current",
        element: <ItemCurrent />,
      },
      {
        path: "items/favorites",
        element: <Favorite />,
      },
      {
        path: "reviews",
        element: <ReviewList />,
      },
      {
        path: "reviews/current",
        element: <ReviewByCurrentUser />,
      },
      {
        path: "items/:id/reviews",
        element: <AddReview />,
      },
      {
        path: "reviews/:id/update",
        element: <ReviewUpdate />,
      },
      {
        path: "reviews/:id/delete",
        element: <ReviewDelete />,
      },
      {
        path: "orders",
        element: <OrderList />,
      },
      {
        path: "orders/:id",
        element: <OrderDetail />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "*",
        element: <LandingPage />,
      },
    ],
  },
]);