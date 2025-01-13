import { createBrowserRouter} from "react-router-dom";

import SignUpPage from "../pages/auth/SignUpPage";
import Login from "../components/Login";
import ProtectedRoute from "../helper/ProtectedRoute";
import Dashboard from "../components/Dashboard";


export const router = createBrowserRouter([

  {
    path: '/register',
    element: <SignUpPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  
  {
    path: '/',
    element: (
      <ProtectedRoute>
        < Dashboard/>
      </ProtectedRoute>
    ),

  },


 
]);