import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import {createHashRouter, RouterProvider} from 'react-router';
import { Courses } from './pages/Courses.jsx';
import { AddCourse } from './pages/AddCourse.jsx';
import { EditCourse } from './pages/EditCourse.jsx';
import { StudentCalculator } from './pages/StudentCalculator.jsx';
import { getCookie } from './hooks/getCookie.js';

const coureId = getCookie('course_id');

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/add-course",
        element: <AddCourse />,
      },
      {
        path: "/courses/:id",
        element: <EditCourse />,
      },
      {
        path: "/calculator",
        element: <StudentCalculator courseId={coureId} />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />,
)
