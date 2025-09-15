import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Posts, { loader as postsLoader } from './routes/Posts.jsx';
import NewPost, { action as nwePostsAction } from './routes/NewPost.jsx';
import PostDetails, { loader as postDetailsLoader } from './routes/PostDetails.jsx';
import RootLayout from './routes/RootLayout.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Posts />,
        loader: postsLoader,
        children: [
          { path: '/create-post', element: <NewPost />, action: nwePostsAction },
          { path: '/:postId', element: <PostDetails />, loader: postDetailsLoader },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
