import { useNavigate } from "react-router-dom";
import { useRedirect } from "../../contexts/RedirectContext";
import { FiLogOut, FiLoader } from "react-icons/fi";
import { useState } from "react";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setRedirectPath } = useRedirect();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("Auth");
      localStorage.removeItem("AuthIv");
      setRedirectPath(null);
      navigate("/signIn");
    }, 1000);
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300 md:text-center disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? (
          <FiLoader className="animate-spin" />
        ) : (
          <FiLogOut size={20} />
        )}
        {isLoading ? "Logging out..." : "Logout"}
      </button>
    </>
  );
};

export default LogoutButton;
