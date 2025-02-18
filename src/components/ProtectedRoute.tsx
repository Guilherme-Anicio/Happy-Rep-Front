import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ElementType;
}

const ProtectedRoute = ({ element: Component }: ProtectedRouteProps): ReactElement => {
  const token = localStorage.getItem('token');

  return token ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
