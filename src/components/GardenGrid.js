import React from 'react';
import PropTypes from 'prop-types';
import './GardenGrid.css';

const GardenGrid = ({ grid, onPlantPlacement, onPlantRemoval, onCellHover, onCellLeave, isLoading, season }) => {
  if (isLoading) {
    return <div className="loading-state">Loading garden grid...</div>;
  }

  const handleCellClick = (e, rowIndex, colIndex) => {
    e.preventDefault();
    
    if (e.type === 'contextmenu' && grid[rowIndex][colIndex]) {
      onPlantRemoval(rowIndex, colIndex);
    } else if (e.type === 'click') {
      onPlantPlacement(rowIndex, colIndex);
    }
  };

  const getPlantEmoji = (cell, season) => {
    if (!cell) return '';
    
    switch(season) {
      case 'spring':
        return '🌱';
      case 'summer':
        return '🌿';
      case 'autumn':
        return '🍂';
      case 'winter':
        return '❄️';
      default:
        return '🌿';
    }
  };

  return (
    <div className="garden-grid">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`plant-cell ${cell ? 'planted' : ''}`}
            onClick={(e) => handleCellClick(e, rowIndex, colIndex)}
            onContextMenu={(e) => handleCellClick(e, rowIndex, colIndex)}
            onMouseEnter={(e) => onCellHover(cell, e)}
            onMouseLeave={onCellLeave}
          >
            {getPlantEmoji(cell, season)}
          </div>
        ))
      )}
    </div>
  );
};

GardenGrid.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.array).isRequired,
  onPlantPlacement: PropTypes.func.isRequired,
  onPlantRemoval: PropTypes.func.isRequired,
  onCellHover: PropTypes.func.isRequired,
  onCellLeave: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  season: PropTypes.string,
};

GardenGrid.defaultProps = {
  isLoading: false,
  season: 'spring',
};

export default GardenGrid;
