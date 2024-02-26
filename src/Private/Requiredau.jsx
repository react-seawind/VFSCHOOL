import { Navigate } from 'react-router-dom';
export default function RequireAuth({ children }) {
  const currentUser = sessionStorage.getItem('newLoginData');

  return currentUser ? children : <Navigate to="/" replace />;
}
