import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/redux/slice/auth.slice';
import CommonLayout from '@/layouts/CommonLayout';
import UnprotectedRoutes from '@/routes/UnprotectedRoutes';
import ProtectedRoutes from '@/routes/ProtectedRoutes';
import '@/App.css';

// Define router outside the component to prevent re-creation on each render
const router = createBrowserRouter([
  {
    element: <CommonLayout isProtected={false} />,
    children: UnprotectedRoutes,
  },
  {
    element: <CommonLayout isProtected={true} />,
    children: ProtectedRoutes,
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth); // Adjust based on your slice name

  useEffect(() => {
    // Only fetch user if not already fetched or loading
    if (!user && !loading) {
      dispatch(fetchUser());
    }
  }, [dispatch, user, loading]); // Include user and loading in dependencies

  return <RouterProvider router={router} />;
};

export default App;