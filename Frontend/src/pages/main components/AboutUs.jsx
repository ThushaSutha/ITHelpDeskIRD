import PropTypes from 'prop-types';
import serverIllustrationImageSrc from '../../images/Aboutus1.png';
import Footer from '../../Layouts/footer/footer';
import Header from '../../Layouts/header/Header';


const AboutUs = ({
  
  heading = 'About Us',
  description = "Who We Are\n The IT Help Desk Ticketing System is a centralized platform designed exclusively for the Inland Revenue Department (IRD). It supports IT operations and services across all district branches within the country, ensuring efficiency, transparency, and effectiveness in resolving technical issues \n Our Mission \n To streamline IT support services and enhance the operational capabilities of IRD by providing a reliable, user-friendly, and efficient ticketing system that addresses IT-related issues promptly. \n Our Vision \n To empower IRD staff with innovative tools that improve IT service delivery, foster collaboration, and ensure the seamless functioning of technical infrastructure in support of organizational goals.",
  imageSrc = serverIllustrationImageSrc,
}) => {
  return (
   
    <div className="bg-gradient-to-b from-[#fcfcfd]  via-[#f5f5f8] to-[#cacace] text-blue-gray-900  min-h-screen flex flex-col justify-center">
<Header />
      {/* Main Content Section */}
      
      <main className="flex-grow flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          <div className="text-center md:text-left">
        

            <h1 className="text-3xl font-display1 mb-4 pl-8 uppercase">{heading}</h1>
            {description.split('\n').map((line, index) => (
              <p className="text-lg mb-2 pl-6 font-display2 text-justify" key={index}> 
                {line}
              </p>
            ))}
          </div>
          <div className="flex justify-center">
            <img
              src={imageSrc}
              alt="Server Illustration"
              className="w-[500px] max-w-lg h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

AboutUs.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  imageSrc: PropTypes.string,
};

export default AboutUs;
