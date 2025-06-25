// backend (Express)
//hlavní server

// /server/index.js
import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

// Dummy uživatel (email + heslo hash)
const DUMMY_USER = {
  email: 'o@o.o',
  // Heslo '1357' hashnuté přes bcrypt (8 salt rounds)
  passwordHash: '$2b$08$3U45fgzvN3r1wXbK.TwD1eNpNvN6FwXn9yTyhxVfO0BXYTrAkT/2K'
};

app.use(express.json());
app.use(cookieParser());

// Umožní požadavky z frontendu (Vercel)
app.use(cors({
  origin: 'https://react-kalendar.vercel.app/', // změň na svou
  credentials: true
}));

// LOGIN ENDPOINT
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (email === DUMMY_USER.email) {
    const match = await bcrypt.compare(password, DUMMY_USER.passwordHash);
    if (match) {
      // Nastav cookie – jednoduchá session
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

// LOGOUT ENDPOINT
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
