import React, { useState } from 'react';
import './GardenLayout.css';

const GardenLayout = () => {
  const [grid, setGrid] = useState(Array(10).fill(Array(10).fill(null)));

  return (
    <div className="garden-layout">
      <h2>My Garden Layout</h2>
      <div className="grid-container">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="grid-cell"
                onClick={() => {
                  // TODO: Implement cell click handler
                  console.log(`Clicked cell: ${rowIndex}, ${colIndex}`);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GardenLayout; 