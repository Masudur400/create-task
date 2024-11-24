import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Root from './components/Root/Root.jsx';
import Home from './components/Home/Home.jsx';
import LoginRegister from './components/LoginRegister/LoginRegister.jsx';
import Login from './components/LoginRegister/Login.jsx';
import Register from './components/LoginRegister/Register.jsx';
import AuthProvider from './components/Providers/AuthProviders.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element:  <Root></Root>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
    ]
  },

  {
    path: 'loginRegister',
    element: <LoginRegister></LoginRegister>,
    children: [
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      }
    ]
  }
]);


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
