import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../customHooks/auth/useAuth";
import { useRedirect } from "../../../contexts/RedirectContext"

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { setRedirectPath } = useRedirect();

  useEffect(() => {
    if (!isAuthenticated) {
      const currentPath = window.location.pathname;

      if (currentPath !== '/signIn') {
        setRedirectPath(currentPath);
        console.log(`Stored redirect path: ${currentPath}`);
       navigate("/signIn")
      }
  
      // console.log('Invalid or expired token, redirecting to sign-in');
      // localStorage.removeItem('token');
      // redirectTo(navigate, '/signIn'); // Trigger the redirection
    }
  }, [isAuthenticated, navigate,setRedirectPath]);
  

  return children;
};

export default ProtectedRoute;
