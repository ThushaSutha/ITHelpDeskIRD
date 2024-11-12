import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF,faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();

    const { name, email, password } = state;
    alert(
      `You are sign up with name: ${name} email: ${email} and password: ${password}`
    );

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  };

  return (
    <div className="form-container sign-up-container class-body">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social">
            <FontAwesomeIcon icon={faFacebookF} className="text-blue-600 hover:text-blue-800" size="2x" />
          </a>
          <a href="#" className="social">
            <FontAwesomeIcon icon={faGooglePlusG} className="text-red-600 hover:text-red-800" size="2x" />
          </a>
          <a href="#" className="social">
            <FontAwesomeIcon icon={faLinkedinIn} className="text-blue-600 hover:text-blue-800" size="2x" />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button className="auth-btn">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
