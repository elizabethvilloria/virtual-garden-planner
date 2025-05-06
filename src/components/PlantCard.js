import React from 'react';
import './PlantCard.css';

const PlantCard = ({ plant }) => {
  const {
    name,
    scientificName,
    type,
    height,
    spread,
    sunExposure,
    waterNeeds,
    imageUrl
  } = plant;

  return (
    <div className="plant-card">
      <div className="plant-image">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="plant-info">
        <h3>{name}</h3>
        <p className="scientific-name">{scientificName}</p>
        <div className="plant-details">
          <p><strong>Type:</strong> {type}</p>
          <p><strong>Height:</strong> {height}</p>
          <p><strong>Spread:</strong> {spread}</p>
          <p><strong>Sun Exposure:</strong> {sunExposure}</p>
          <p><strong>Water Needs:</strong> {waterNeeds}</p>
        </div>
      </div>
    </div>
  );
};

export default PlantCard; 