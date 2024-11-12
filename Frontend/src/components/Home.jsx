import PropTypes from 'prop-types';
import serverIllustrationImageSrc from '../images/ticket.png';

const Home = ({
  heading = 'IT Help Desk Ticketing System',
  description = "Welcome to our Home Page!\nWe're delighted to have you here. Explore our site.",
  imageSrc = serverIllustrationImageSrc,
}) => {
  return (
    <div className="bg-gray-800 text-white min-h-screen flex flex-col justify-center">

      {/* Main Content Section */}
      <main className="flex-grow flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-extrabold mb-4 pl-6">{heading}</h1>
            {description.split('\n').map((line, index) => (
              <p className="text-lg mb-2 pl-6" key={index}>
                {line}
              </p>
            ))}
          </div>
          <div className="flex justify-center">
            <img
              src={imageSrc}
              alt="Server Illustration"
              className="w-[290px] max-w-lg h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

Home.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  imageSrc: PropTypes.string,
};

export default Home;
