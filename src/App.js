import React, { useState, useEffect } from 'react';
import GardenGrid from './components/GardenGrid';
import PlantSelector from './components/PlantSelector';

const App = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [gridSize, setGridSize] = useState(5);
  const [grid, setGrid] = useState(
    Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => null))
  );
  const [darkMode, setDarkMode] = useState(false);
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });
  const [weather, setWeather] = useState({ temp: null, condition: 'sunny' });
  const [season, setSeason] = useState('spring');
  const [plantStats, setPlantStats] = useState({
    totalPlants: 0,
    plantTypes: {}
  });
  const [lastRemoved, setLastRemoved] = useState(null);
  const [lastRemovedPosition, setLastRemovedPosition] = useState(null);
  const [gardenName, setGardenName] = useState('My Tiny Garden');
  const [isEditingName, setIsEditingName] = useState(false);
  const [gardenTheme, setGardenTheme] = useState('default');
  const [isWateringMode, setIsWateringMode] = useState(false);
  const [wateredPlants, setWateredPlants] = useState(new Set());

  useEffect(() => {
    const conditions = ['sunny', 'rainy', 'cloudy'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    const randomTemp = Math.floor(Math.random() * (30 - 15) + 15);
    setWeather({ temp: randomTemp, condition: randomCondition });
  }, []);

  useEffect(() => {
    const seasons = ['spring', 'summer', 'autumn', 'winter'];
    const currentMonth = new Date().getMonth();
    const currentSeason = seasons[Math.floor(currentMonth / 3) % 4];
    setSeason(currentSeason);
  }, []);

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
      
      setPlantStats(prev => ({
        totalPlants: prev.totalPlants + 1,
        plantTypes: {
          ...prev.plantTypes,
          [selectedPlant]: (prev.plantTypes[selectedPlant] || 0) + 1
        }
      }));
    }
  };

  const handlePlantRemoval = (rowIndex, colIndex) => {
    const plant = grid[rowIndex][colIndex];
    if (plant) {
      setLastRemoved(plant);
      setLastRemovedPosition({ row: rowIndex, col: colIndex });
      
      const newGrid = grid.map((row, rIndex) =>
        row.map((cell, cIndex) =>
          rIndex === rowIndex && cIndex === colIndex ? null : cell
        )
      );
      setGrid(newGrid);
      
      setPlantStats(prev => ({
        totalPlants: prev.totalPlants - 1,
        plantTypes: {
          ...prev.plantTypes,
          [plant]: prev.plantTypes[plant] - 1
        }
      }));
    }
  };

  const handleUndo = () => {
    if (lastRemoved && lastRemovedPosition) {
      const { row, col } = lastRemovedPosition;
      const newGrid = grid.map((r, rIndex) =>
        r.map((cell, cIndex) =>
          rIndex === row && cIndex === col ? lastRemoved : cell
        )
      );
      setGrid(newGrid);
      
      setPlantStats(prev => ({
        totalPlants: prev.totalPlants + 1,
        plantTypes: {
          ...prev.plantTypes,
          [lastRemoved]: (prev.plantTypes[lastRemoved] || 0) + 1
        }
      }));
      
      setLastRemoved(null);
      setLastRemovedPosition(null);
    }
  };

  const handleGridResize = (newSize) => {
    setGridSize(newSize);
    setGrid(Array.from({ length: newSize }, () => 
      Array.from({ length: newSize }, () => null)
    ));
    setPlantStats({
      totalPlants: 0,
      plantTypes: {}
    });
  };

  const handleWatering = (rowIndex, colIndex) => {
    if (isWateringMode && grid[rowIndex][colIndex]) {
      const plantKey = `${rowIndex}-${colIndex}`;
      setWateredPlants(prev => new Set(prev).add(plantKey));
      
      setTimeout(() => {
        setWateredPlants(prev => {
          const newSet = new Set(prev);
          newSet.delete(plantKey);
          return newSet;
        });
      }, 1000);
    }
  };

  return (
    <div className={`garden-app ${darkMode ? 'dark-mode' : ''} season-${season}`}>
      {isEditingName ? (
        <div className="garden-name-edit">
          <input
            type="text"
            value={gardenName}
            onChange={(e) => setGardenName(e.target.value)}
            className="garden-input"
            autoFocus
            onBlur={() => setIsEditingName(false)}
            onKeyPress={(e) => e.key === 'Enter' && setIsEditingName(false)}
          />
        </div>
      ) : (
        <h1 onClick={() => setIsEditingName(true)} style={{ cursor: 'pointer' }}>
          🌿 {gardenName} 🌿 
          <span className="edit-hint">✏️</span>
        </h1>
      )}
      <button 
        className="garden-button"
        onClick={() => setDarkMode(!darkMode)}
        style={{ position: 'absolute', top: '20px', right: '20px' }}
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
      <button 
        className="garden-button"
        onClick={() => setIsWateringMode(!isWateringMode)}
        style={{ position: 'absolute', top: '60px', right: '20px' }}
      >
        {isWateringMode ? '🌱 Plant' : '💧 Water'}
      </button>
      <div className="weather-widget">
        <span className="weather-icon">
          {weather.condition === 'sunny' ? '☀️' : 
           weather.condition === 'rainy' ? '🌧️' : '☁️'}
        </span>
        <span>
          {weather.temp}°C - {weather.condition === 'sunny' ? 'Water your plants!' :
           weather.condition === 'rainy' ? 'Perfect growing weather!' : 'Moderate watering needed'}
        </span>
      </div>
      <div className="grid-controls">
        <label>Garden Size: </label>
        <select 
          value={gridSize} 
          onChange={(e) => handleGridResize(Number(e.target.value))}
          className="garden-select"
        >
          <option value="3">3 x 3</option>
          <option value="5">5 x 5</option>
          <option value="7">7 x 7</option>
          <option value="9">9 x 9</option>
        </select>
        <label>Theme: </label>
        <select 
          value={gardenTheme} 
          onChange={(e) => setGardenTheme(e.target.value)}
          className="garden-select"
        >
          <option value="default">Default</option>
          <option value="zen">Zen Garden</option>
          <option value="tropical">Tropical</option>
          <option value="cottage">Cottage</option>
        </select>
      </div>
      <PlantSelector onSelectPlant={handleSelectPlant} />
      <div className="selected-plant">
        Currently selected: {selectedPlant || '(None)'}
      </div>
      <div className="stats-container">
        <h3>Garden Statistics</h3>
        <p>Total Plants: {plantStats.totalPlants}</p>
        <div className="plant-counts">
          {Object.entries(plantStats.plantTypes).map(([plant, count]) => (
            <span key={plant} className="plant-stat">
              {plant}: {count}
            </span>
          ))}
        </div>
      </div>
      {lastRemoved && (
        <button 
          className="garden-button"
          onClick={handleUndo}
          style={{ marginTop: '10px' }}
        >
          ↩️ Undo Remove {lastRemoved}
        </button>
      )}
      <GardenGrid
        grid={grid}
        onPlantPlacement={handlePlantPlacement}
        onPlantRemoval={handlePlantRemoval}
        onCellHover={(plant, event) => {
          if (plant) {
            setTooltip({
              show: true,
              text: `${plant} - Right-click to remove`,
              x: event.clientX + 10,
              y: event.clientY + 10
            });
          } else {
            setTooltip({ ...tooltip, show: false });
          }
        }}
        onCellLeave={() => setTooltip({ ...tooltip, show: false })}
        isWateringMode={isWateringMode}
        onWatering={handleWatering}
        wateredPlants={wateredPlants}
      />
      {tooltip.show && (
        <div 
          className="plant-tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default App;
