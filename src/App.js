import React, { useState } from 'react';
import GardenGrid from './components/GardenGrid';
import PlantSelector from './components/PlantSelector';

const App = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [grid, setGrid] = useState(
    Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => null))
  );

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
    <div>
      <PlantSelector onSelectPlant={handleSelectPlant} />
      <GardenGrid
        grid={grid}
        onPlantPlacement={handlePlantPlacement}
      />
    </div>
  );
};

export default App;
