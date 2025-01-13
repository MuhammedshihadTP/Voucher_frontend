
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children,  }) => {

  const userToken = localStorage.getItem('token');
  return userToken ? children : <Navigate to={'/login'} />;
};

export default ProtectedRoute;