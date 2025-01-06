import React, { useState, useEffect } from 'react';
import GardenGrid from './components/GardenGrid';
import PlantSelector from './components/PlantSelector';

const App = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [grid, setGrid] = useState(
    Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => null))
  );
  const [darkMode, setDarkMode] = useState(false);
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });
  const [weather, setWeather] = useState({ temp: null, condition: 'sunny' });
  const [season, setSeason] = useState('spring');

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
    }
  };

  return (
    <div className={`garden-app ${darkMode ? 'dark-mode' : ''} season-${season}`}>
      <h1>🌿 My Tiny Garden 🌿</h1>
      <button 
        className="garden-button"
        onClick={() => setDarkMode(!darkMode)}
        style={{ position: 'absolute', top: '20px', right: '20px' }}
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
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
      <PlantSelector onSelectPlant={handleSelectPlant} />
      <div className="selected-plant">
        Currently selected: {selectedPlant || '(None)'}
      </div>
      <GardenGrid
        grid={grid}
        onPlantPlacement={handlePlantPlacement}
        onCellHover={(plant, event) => {
          if (plant) {
            setTooltip({
              show: true,
              text: `${plant} - Perfect for your garden!`,
              x: event.clientX + 10,
              y: event.clientY + 10
            });
          } else {
            setTooltip({ ...tooltip, show: false });
          }
        }}
        onCellLeave={() => setTooltip({ ...tooltip, show: false })}
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
