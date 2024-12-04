import { useContext } from 'react';
import PropTypes from 'prop-types'; 
import { userContext } from './ContextProvider';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../customHooks/auth/useAuth';
import { useRedirect } from '../contexts/RedirectContext';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { role } = useContext(userContext);
  const { isAuthenticated } = useAuth();
  const { setRedirectPath } = useRedirect();

  if (!isAuthenticated) {
    const currentPath = window.location.pathname;

    if (currentPath !== 'signIn') {
      setRedirectPath(currentPath);
      console.log(`Store redirect path: ${currentPath}`);
      return <Navigate to="/signIn" replace={true} />;
    }
  }

  if (!roles.includes(role)) {
    return <Navigate to="/unauthorized" replace={true} />;
  }

  return children;
};

// Prop validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,  
  roles: PropTypes.arrayOf(PropTypes.string)  
};

export default ProtectedRoute;
