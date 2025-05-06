import React from 'react';
import './App.css';
import GardenLayout from './components/GardenLayout';
import PlantCard from './components/PlantCard';
import { plants } from './data/plants';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Virtual Garden Planner</h1>
      </header>
      <main>
        <section className="garden-section">
          <GardenLayout />
        </section>
        <section className="plants-section">
          <h2>Available Plants</h2>
          <div className="plants-grid">
            {plants.map(plant => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
