import React from 'react';
import PropTypes from 'prop-types';
import './GardenGrid.css';

const GardenGrid = ({ grid, onPlantPlacement }) => {
    return (
      <div className="garden-grid">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="grid-cell"
              onClick={() => onPlantPlacement(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
    );
  };

GardenGrid.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.array).isRequired,
  onPlantPlacement: PropTypes.func.isRequired,
};

export default GardenGrid;
