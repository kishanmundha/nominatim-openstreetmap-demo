import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DetailPage } from './Detail/DetailPage';
import { HomePage } from './Home/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/detail',
    element: <DetailPage />,
  },
  {
    path: '*',
    element: <div>Not found</div>,
  },
]);

export const Root: React.FC = () => {
  return <RouterProvider router={router} />;
};
