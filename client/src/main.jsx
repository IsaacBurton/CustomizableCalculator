import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import {createHashRouter, RouterProvider} from 'react-router';
import { Courses } from './pages/Courses.jsx';
import { AddCourse } from './pages/AddCourse.jsx';
import { EditCourse } from './pages/EditCourse.jsx';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Courses />,
      },
      {
        path: "/add-course",
        element: <AddCourse />,
      },
      {
        path: "/course/:id",
        element: <EditCourse />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />,
)
