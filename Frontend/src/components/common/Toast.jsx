import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toast({ message = "Default message", type = "success", position = "top-center" }) {
  
  const notify = () => {
    switch (type) {
      case "success":
        toast.success(message, { position });
        break;
      case "error":
        toast.error(message, { position });
        break;
      case "warning":
        toast.warning(message, { position });
        break;
      default:
        toast.info(message, { position });
        break;
    }
  };

  return (
    <>
      <ToastContainer
        position={position}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <button onClick={notify} className="px-4 py-2 bg-blue-500 text-white rounded">
        Show Toast
      </button>
    </>
  );
}

// Prop Validation using PropTypes
Toast.propTypes = {
  message: PropTypes.string, // Message should be a string
  type: PropTypes.oneOf(["success", "error", "warning", "info"]), // Restrict type to specific values
  position: PropTypes.oneOf([
    "top-left",
    "top-right",
    "top-center",
    "bottom-left",
    "bottom-right",
    "bottom-center"
  ]) // Restrict position to valid Toastify positions
};

export default Toast;
