// /server/index.js
import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

// Dummy uživatel
const DUMMY_USER = {
  email: 'o@o.o',
  passwordHash: '$2b$08$3U45fgzvN3r1wXbK.TwD1eNpNvN6FwXn9yTyhxVfO0BXYTrAkT/2K' // heslo: 1357
};

// CORS konfigurace
const corsOptions = {
  origin: ['https://react-kalendar.vercel.app'],  // ✅ frontend doména
  credentials: true
};

// ✅ Přesná CORS konfigurace – opravuje CORS error s credentials
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://react-kalendar.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  
  // OPTIONS preflight – vrací 200 okamžitě
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

const isProduction = process.env.NODE_ENV === 'production';

// LOGIN
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (email === DUMMY_USER.email) {
    const match = await bcrypt.compare(password, DUMMY_USER.passwordHash);
    if (match) {
      res.cookie('session', 'valid-session-token', {
        httpOnly: true,
        sameSite: 'lax',
        secure: true
      });
      return res.json({ success: true });
    }
  }

  return res.status(401).json({ success: false, message: 'Neplatný email nebo heslo' });
});

// LOGOUT
app.post('/api/logout', (req, res) => {
  res.clearCookie('session');
  res.json({ success: true });
});

// OVĚŘENÍ SESSION
app.get('/api/me', (req, res) => {
  if (req.cookies.session === 'valid-session-token') {
    res.json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});
