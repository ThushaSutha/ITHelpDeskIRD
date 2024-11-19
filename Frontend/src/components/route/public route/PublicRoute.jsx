import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../customHooks/auth/useAuth";

const PublicRoute = ({ children }) => {
const { isAuthenticated } = useAuth();
const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard"); 
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? null : children;
};

export default PublicRoute;