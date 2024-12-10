import React from 'react';
import './GardenGrid.css';

const GardenGrid = () => {
  const rows = 5;
  const cols = 5;
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => null)
  );

  return (
    <div className="garden-grid">
      {grid.map((row, rowIndex) =>
        row.map((_, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className="grid-cell"></div>
        ))
      )}
    </div>
  );
};

export default GardenGrid;
