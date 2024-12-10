import React from 'react';

const PlantSelector = ({ onSelectPlant }) => {
  const plants = ['🌼', '🌳', '🌵'];

  return (
    <div>
      <h3>Select a Plant</h3>
      {plants.map((plant, index) => (
        <button key={index} onClick={() => onSelectPlant(plant)}>
          {plant}
        </button>
      ))}
    </div>
  );
};

export default PlantSelector;
