import React from 'react';
import Header from '../../Layouts/header/Header';
import Footer from '../../Layouts/footer/footer';


const FAQ = () => {
 
  const faqs = [
    {
      title: "Usage Questions",
      question: "How do I log a new ticket?",
      answer:
        "Navigate to the 'Home Page', log in with your credentials, and select 'New Ticket.' Fill in the required details and submit the form.",
  
    },
    {
      question: "How can I track the status of my ticket?",
      answer:
        "After logging in, go to 'My Tickets' to view the status, priority, and updates on your submitted tickets.",
    },
    {
      question: "What should I do if I forget my password?",
      answer:
        "Use the 'Forgot Password' link on the login page. Follow the instructions to reset your password securely.",
    },
    {
      title: "Support Questions",
      question: "Who should I contact for system-related issues?",
      answer:
        "For technical support, please contact the IT support team within your branch office or raise a ticket under the 'System Issues' category.",
    },
    {
      question: "What happens if my issue is not resolved on time?",
      answer:
        "Tickets with delays are escalated automatically to the IT Officer or IT Director, depending on their priority. You can also follow up directly via the ticket comments section.",
    },
    {
      question: "How can I provide feedback on the system?",
      answer:
        "Use the 'Feedback' feature on the Home Page to submit your comments, suggestions, or concerns regarding the system.",
    },
  ];

  return (
  
    <div className="bg-gradient-to-b from-[#fcfcfd]  via-[#f5f5f8] to-[#cacace]">
      <Header />
    <div className="max-w-4xl mx-auto  p-6">
      <h1 className="text-3xl font-bold text-center  text-gray-800 mb-8">
        Frequently Asked Questions (FAQ)
      </h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-4"
          >
            <p className=" mt-2  text-gray-800 text-xl font-bold font underline">{faq.title}</p>
            <h3 className="text-xl font-semibold text-blue-600 mt-2">
              {faq.question}
            </h3>
            <p className="mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </div>
      
      
    
  );
};

export default FAQ;