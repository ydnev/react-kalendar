import React from 'react';
import Kalendar from './components/Kalendar';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <div className="kalendar-wrapper">
        <h1 className="kalendar-nadpis">Kalendář pro booking</h1>
        <Kalendar />
      </div>
    </div>
  );
}

export default App;