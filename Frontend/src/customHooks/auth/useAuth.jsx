import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) return { isAuthenticated: false, isExpired: true };

    try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        return { isAuthenticated: !isExpired, isExpired };
    } catch {
        return { isAuthenticated: false, isExpired: true };
    }
};
