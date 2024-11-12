import React from 'react';

const DeviceCategories = () => {
  const categories = [
    'CPU',
    'Monitor',
    'Printer',
    'Scanner',
    'Phone (Analog/Digital)',
    'Network Switch',
    'UPS',
    'Others',
  ];

  return (
    <ul>
      {categories.map((category, index) => (
        <li key={index}>{category}</li>
      ))}
    </ul>
  );
};

export default DeviceCategories;