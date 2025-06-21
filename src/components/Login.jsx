import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // VALIDACE – kontrola, že pole nejsou prázdná
        if (email.trim() === '' || password.trim() === '') {
            setError('Vyplňte email i heslo.');
            return;
        }

        // KONKRÉTNÍ email a heslo (např. admin@example.com a 1234)
        const validEmail = 'admin@example.com';
        const validPassword = '1234';

        if (email === validEmail && password === validPassword) {
            setError('');
            console.log('Přihlášení úspěšné');
            onLoginSuccess(); // Přihlášení OK – spustí se funkce z App.jsx
        } else {
            setError('Neplatný email nebo heslo.');
        }
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
                    setError('');
                }}
            />

            <input 
                type="password" 
                placeholder="Heslo"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                }}
            />

            <button type="submit">Přihlásit se</button>

            {/* Zobrazení chyby */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}

export default Login;
