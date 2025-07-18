import React, { useState } from 'react';
import './Login.css';

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const TEST_EMAIL = 'o@o.o';
    const TEST_PASSWORD = '1357';

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email.trim() === '' || password.trim() === '') {
            setError('Email i heslo musí být vyplněny.');
            return;
        }

        if (email === TEST_EMAIL && password === TEST_PASSWORD) {
            setError('');
            onLoginSuccess(); // Úspěšné přihlášení
        } else {
            setError('Neplatný email nebo heslo.');
        }
    };

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">Přihlášení</h2>

                {error && <p className="login-error">{error}</p>}

                <input 
                    type="email" 
                    placeholder="Email"
                    className="login-input"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                    }}
                />

                <input 
                    type="password" 
                    placeholder="Heslo"
                    className="login-input"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                    }}
                />

                <button type="submit" className="login-button">Přihlásit se</button>
            </form>
        </div>
    );
}

export default Login;
