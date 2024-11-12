import React from 'react';

const IssueTypes = () => {
  const issueTypes = [
    'Equipment Issue',
    'Software Issue',
    'Network Issue',
    'RAMS System Issue',
    'Email Issue',
    'Others',
  ];

  return (
    <ul>
      {issueTypes.map((type, index) => (
        <li key={index}>{type}</li>
      ))}
    </ul>
  );
};

export default IssueTypes;