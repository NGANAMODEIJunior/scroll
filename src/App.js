import React from 'react';
import './App.css';
import InfiniteScroll from './InfiniteScroll'; // Assurez-vous que le chemin est correct

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mon Application avec Défilement Infini</h1>
      </header>
      <main>
        <InfiniteScroll />
      </main>
    </div>
  );
}

export default App;
