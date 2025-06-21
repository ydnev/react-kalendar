import React, { useState } from 'react'; // Import Reactu a hooku useState pro správu stavu
import Kalendar from './components/Kalendar'; // Import komponenty kalendáře
import Login from './components/Login'; // Import komponenty pro přihlašovací formulář
import './App.css'; // Import CSS stylů pro aplikaci

function App() {
  // Vytvoření stavu isLoggedIn (false = uživatel není přihlášen)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Tato fce se zavolá, když uživatel úspěšně vyplní login formulář
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Přepne stav přihlášení na true
  };

  return (
    <div className="app-wrapper"> {/* Hlavní obal celé aplikace */}
      
      {isLoggedIn ? ( // Podmínka: pokud je uživatel přihlášen...
        <div className="kalendar-wrapper"> {/* Zobrazí se kalendář */}
          <h1 className="kalendar-nadpis">Kalendář pro booking</h1>
          <Kalendar /> {/* Komponenta kalendáře */}
        </div>
      ) : ( // Jinak (uživatel ještě není přihlášen)...
        <div className="login-wrapper"> {/* Zobrazí se přihlašovací formulář */}
          <h2>Přihlášení uživatele</h2>
          <Login onLoginSuccess={handleLoginSuccess} /> 
          {/* Komponentě Login předáváme funkci, která se má spustit po úspěšném přihlášení */}
        </div>
      )}

    </div>
  );
}

export default App; // Exportujeme komponentu App jako hlavní komponentu celé aplikace
