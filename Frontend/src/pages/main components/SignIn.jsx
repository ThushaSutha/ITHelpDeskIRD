import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import serverIllustrationImageSrc from "../../images/ticket.png";
import BackgroundImage from "../../assets/Home2.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../../components/common/Toast";
import api from "../../api/auth"
import { redirectTo } from "../../utils/helpers";
import { useRedirect } from "../../contexts/RedirectContext";
import { userContext  } from '../../contexts/ContextProvider';


function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { redirectPath, setRedirectPath } = useRedirect();
  const { login } = useContext(userContext);
  
  

  const Auth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please fill in all fields.", {
        position: "top-right",
      });
      return;
    }
    try {
      const { data } = await api.post('/api/auth/signin', { email, password });
            
            // role(role);

            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('userRole',data.role);
            
            localStorage.setItem('Auth',data.emId);
            localStorage.setItem('AuthIv',data.iv);
            
            
            
      toast.success("Login successful!", {
        position: "top-right",
      });



      if(data.role === 'admin'){
        // login('admin');
        const path = "/dashboard";
        // setRedirectPath(null);
        navigate(path);
      }else{
        // login('staff');
        const path = "/dashboard";
        console.log(path);
        // setRedirectPath(null);
        navigate(path);
      }
      
      
        
      // redirectTo(navigate, redirectPath);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message, {
          position: "top-right",
        });
        console.log(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.", {
          position: "top-right",
        });
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <>
      

      <div
        style={{ backgroundImage: `url(${BackgroundImage})` }}
        className="flex items-center justify-center min-h-screen bg-gray-100"
      >
        <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg md:flex md:flex-row md:space-x-6">
          <div className="hidden md:flex md:flex-col md:items-center md:justify-center bg-gradient-to-r from-[#111827] to-[#01236b] rounded-lg p-6 md:w-1/2">
            <h1 className="text-2xl font-semibold text-blue-100 mb-4">
              <u>IT Help Desk</u>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>Ticketing System</u>
            </h1>
            <img
              src={serverIllustrationImageSrc}
              alt="Server Illustration"
              className="w-48 h-auto rounded-lg shadow-md"
            />
            <p className="mt-4 text-center text-gray-200">
              Help Desk to perform more <br />
              on your work...
            </p>
          </div>

          <div className="flex flex-col items-center justify-center md:w-1/2">
            <form onSubmit={Auth} className="w-full max-w-md space-y-4">
              <h1 className="text-xl font-bold text-center text-gray-800">
                <u>Welcome Back</u>
              </h1>
              <span className="block text-center text-gray-600">
                Please enter your details
              </span>

              <input
                type="email"
                name="email"
                placeholder="Employee ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Email"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Password"
              />

              <div className="flex justify-center md:justify-start space-x-1 text-sm text-gray-600">
                <span className="text-red-600">*</span>
                <span>Authorized IRD staff only</span>
              </div>

              <a href="#" className="block text-blue-500 text-center text-sm">
                Forgot your password?
              </a>

              <button
                type="submit"
                className="w-full py-2 mt-4 text-white bg-gradient-to-r from-[#111827] to-[#01236b] rounded-md hover:from-[#01236b] hover:to-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInForm;
