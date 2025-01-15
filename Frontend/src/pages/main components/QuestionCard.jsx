import '../../App.css';
import contactImage from '../../images/faq.png';
import chatImage from '../../images/chat.png';

function QuestionCard() {
  const questions = [
    { id: 1, title: 'FAQ', link: '/FAQ', imageSrc: contactImage },
    { id: 2, title: 'More Chat', link: '/Chatbot', imageSrc: chatImage }
  ];

  return (
    <div className="questions-container">
      {questions.map((option) => (
        <div 
          key={option.id} 
          className="questions-card" 
          onClick={() => window.location.href = option.link}
        >
          {/* Display the image */}
          <img src={option.imageSrc} alt={option.title} className="questions-card-image" />
          <h2>{option.title}</h2>
          <button>Click Here</button>
        </div>
      ))}
    </div>
  );
}

export default QuestionCard;