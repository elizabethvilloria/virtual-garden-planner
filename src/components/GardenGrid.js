import React from 'react';
import './GardenGrid.css';

class GardenGridErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-message">Error loading garden grid</div>;
    }
    return this.props.children;
  }
}

const GardenGrid = ({ grid, onPlantPlacement }) => {
  return (
    <GardenGridErrorBoundary>
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
    </GardenGridErrorBoundary>
  );
};

export default GardenGrid;
