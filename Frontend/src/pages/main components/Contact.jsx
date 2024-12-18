import React from "react";
import serverIllustrationImageSrc from "../../images/Contact.png";




function Contact() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    message: "",
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
    const { name, email, message } = state;
    alert(`Thank you for contacting us, ${name}! Your message: "${message}" has been received.`);
    setState({ name: "", email: "", message: "" });
  };

  return (
    
    <div className="bg-gradient-to-r from-[#20213f] to-[#303238] text-gray-400 min-h-screen flex flex-col justify-center">
  
    <div className="flex items-center justify-center min-h-screen bg-gray-400 ">
   
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg md:flex md:flex-row md:space-x-6">
        <div className="hidden md:flex md:flex-col md:items-center md:justify-center bg-gradient-to-r from-[#222150] to-[#232a3b] rounded-lg p-6 md:w-1/2">
          <h1 className="text-2xl font-semibold text-blue-100 mb-4">
            <u>Contact Us</u>
          </h1>
          <img
            src={serverIllustrationImageSrc}
            alt="Contact Illustration"
            className="w-48 h-auto rounded-lg shadow-md"
          />
          <p className="mt-4 text-center text-gray-200"> Reach out to us and<br /> we'll get back to you!
          </p>
        </div>

        <div className="flex flex-col items-center justify-center md:w-1/2">
          <form onSubmit={handleOnSubmit} className="w-full max-w-md space-y-4">
            <h1 className="text-xl font-bold text-center text-gray-800">
              <u>Get in Touch</u>
            </h1>
            <span className="block text-center text-gray-600">
              Fill out the form below
            </span>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={state.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={state.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={state.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-gradient-to-r from-[#0c101a] to-[#3d3e41] rounded-md hover:from-[#01236b] hover:to-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Contact;