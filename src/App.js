import React, { useState } from 'react';
import GardenGrid from './components/GardenGrid';
import PlantSelector from './components/PlantSelector';

const App = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [grid, setGrid] = useState(
    Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => null))
  );
  const [darkMode, setDarkMode] = useState(false);

  const handleSelectPlant = (plant) => {
    setSelectedPlant(plant);
  };

  const handlePlantPlacement = (rowIndex, colIndex) => {
    if (selectedPlant) {
      const newGrid = grid.map((row, rIndex) =>
        row.map((cell, cIndex) =>
          rIndex === rowIndex && cIndex === colIndex ? selectedPlant : cell
        )
      );
      setGrid(newGrid);
    }
  };

  return (
    <div className={`garden-app ${darkMode ? 'dark-mode' : ''}`}>
      <h1>🌿 My Tiny Garden 🌿</h1>
      <button 
        className="garden-button"
        onClick={() => setDarkMode(!darkMode)}
        style={{ position: 'absolute', top: '20px', right: '20px' }}
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
      <PlantSelector onSelectPlant={handleSelectPlant} />
      <div className="selected-plant">
        Currently selected: {selectedPlant || '(None)'}
      </div>
      <GardenGrid
        grid={grid}
        onPlantPlacement={handlePlantPlacement}
      />
    </div>
  );
};

export default App;
