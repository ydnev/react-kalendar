import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
    //vytvoření stavů pro email a heslo
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Stav pro chybovou zprávu
     
    //funkce pro odeslání formuláře
    const handleSubmit = (e) => {
    e.preventDefault(); // zabráníme reloadu stránky

    // VALIDACE – kontrola, že obě pole jsou vyplněná
    if (email.trim() === '' || password.trim() === '') {
        console.log('Chyba: Email nebo heslo není vyplněné.');
        return; // zastaví odeslání, protože data nejsou validní
    }

    // Pokud validace projde, pokračujeme
    console.log('Přihlašuji se s:', email, password);
};

 return (
        <form onSubmit={handleSubmit}>
            <h2>Přihlášení</h2>

            <input 
                type="email" 
                placeholder="Email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    console.log("Změna emailu:", e.target.value);
                }}
            />

            <input 
                type="password" 
                placeholder="Heslo"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                console.log("Změna hesla:", e.target.value);
                }}
            />

            <button type="submit">Přihlásit se</button>
        </form>
    );
}

export default Login;