import React from "react";
import serverIllustrationImageSrc from "../../images/ticket.png";


function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = state;
    alert(`You are logged in with email: ${email} and password: ${password}`);
    setState({ email: "", password: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg md:flex md:flex-row md:space-x-6">
        <div className="hidden md:flex md:flex-col md:items-center md:justify-center bg-gradient-to-r from-[#111827] to-[#01236b] rounded-lg p-6 md:w-1/2">
          <h1 className="text-2xl font-semibold text-blue-100 mb-4">
          <u>IT Help Desk</u><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>Ticketing System</u>

          </h1>
          <img
            src={serverIllustrationImageSrc}
            alt="Server Illustration"
            className="w-48 h-auto rounded-lg shadow-md"
          />
          <p className="mt-4 text-center text-gray-200">
            Help Desk to perform more <br />on your work...
          </p>
        </div>

        <div className="flex flex-col items-center justify-center md:w-1/2">
          <form onSubmit={handleOnSubmit} className="w-full max-w-md space-y-4">
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
              value={state.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              LogIn
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
