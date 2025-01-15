
import PropTypes from 'prop-types';
import serverIllustrationImageSrc from '../../images/ticket.png';
import Footer from '../../Layouts/footer/footer';
import QuestionCard from './QuestionCard';


const Home = ({
  heading = 'IT Help Desk Ticketing System',
  description = "Welcome to our Home Page!\nWe're delighted to have you here. Explore the system to report an issue, tract your tickets, or contact IT support. Click the menu options above to navigate! \n  Thank you for using our system to make IT management easier and more effective.",
  imageSrc = serverIllustrationImageSrc,
}) => {
  return (
    <div className="bg-gradient-to-b from-[#fcfcfd]  via-[#f5f5f8] to-[#cacace] text-blue-gray-900 first-line:min-h-screen flex flex-col justify-center">

      {/* Main Content Section */}
      <main className="flex-grow flex items-center justify-center">
        
          <div className="text-center md:text-left">
         
            <h1 className="text-5xl mb-4 pl-6 uppercase font-display1">{heading}</h1>
            
            {description.split('\n').map((line, index) => (
              <p className="text-lg mb-2 pl-6 font-display3 text-justify" key={index}> 
                {line}
              </p>
              
            ))}
          </div>
         
          <div className="flex justify-center items-center h-screen p-2" >
      
            <img
              src={imageSrc}
              alt="Server Illustration"
              className="  h-[400px]  w-[350px] rounded-lg shadow-lg"
            />
           
          </div>
          <QuestionCard />
      
   
      </main>
      <Footer />
    </div>
  );
};

Home.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  imageSrc: PropTypes.string,
};

export default Home;
