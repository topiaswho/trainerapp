import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Traininglist from './components/Traininglist.jsx';
import Customerlist from './components/Customerlist.jsx';
import Calendar from './components/Calendar.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error occurred</div>,
    children: [
      {
        element: <Customerlist />,
        index: true
      },
      {
        path: "Traininglist",
        element: <Traininglist />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
);
