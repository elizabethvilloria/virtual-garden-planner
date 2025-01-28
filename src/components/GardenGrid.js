import React from 'react';
import PropTypes from 'prop-types';
import './GardenGrid.css';

const GardenGrid = ({ grid, onPlantPlacement, onPlantRemoval, onCellHover, onCellLeave, isLoading, season, isWateringMode, onWatering, wateredPlants, plantGrowth }) => {
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

  const getPlantEmoji = (cell, season, growthStage = 0) => {
    if (!cell) return '';
    
    // Growth stages: 0-2 (seedling), 3-5 (growing), 6+ (mature)
    const stage = growthStage < 3 ? 'seedling' : 
                  growthStage < 6 ? 'growing' : 'mature';
    
    switch(season) {
      case 'spring':
        return stage === 'seedling' ? '🌱' :
               stage === 'growing' ? '🌿' : '🌸';
      case 'summer':
        return stage === 'seedling' ? '🌱' :
               stage === 'growing' ? '🌿' : '🌺';
      case 'autumn':
        return stage === 'seedling' ? '🌱' :
               stage === 'growing' ? '🌿' : '🍂';
      case 'winter':
        return stage === 'seedling' ? '🌱' :
               stage === 'growing' ? '❄️' : '☃️';
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
            className={`plant-cell ${cell ? 'planted' : ''} ${
              wateredPlants.has(`${rowIndex}-${colIndex}`) ? 'watered' : ''
            }`}
            onClick={(e) => {
              if (isWateringMode) {
                onWatering(rowIndex, colIndex);
              } else {
                handleCellClick(e, rowIndex, colIndex);
              }
            }}
            onContextMenu={(e) => handleCellClick(e, rowIndex, colIndex)}
            onMouseEnter={(e) => onCellHover(cell, e)}
            onMouseLeave={onCellLeave}
          >
            {cell ? getPlantEmoji(
              cell, 
              season, 
              plantGrowth[`${rowIndex}-${colIndex}`] || 0
            ) : ''}
            {wateredPlants.has(`${rowIndex}-${colIndex}`) && (
              <span className="water-drop"></span>
            )}
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
  isWateringMode: PropTypes.bool,
  onWatering: PropTypes.func,
  wateredPlants: PropTypes.instanceOf(Set),
  plantGrowth: PropTypes.object,
};

GardenGrid.defaultProps = {
  isLoading: false,
  season: 'spring',
  isWateringMode: false,
  wateredPlants: new Set(),
  plantGrowth: {},
};

export default GardenGrid;
