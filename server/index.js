import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';

const app = express();
const PORT = process.env.PORT || 4000;

// Dummy uživatel (email: o@o.o, heslo: 1357)
const DUMMY_USER = {
  email: 'o@o.o',
  passwordHash: '$2b$08$3U45fgzvN3r1wXbK.TwD1eNpNvN6FwXn9yTyhxVfO0BXYTrAkT/2K'
};

// ✅ CORS middleware – ručně nastavené hlavičky
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://react-kalendar.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  console.log('⚙️ CORS DEBUG:', {
    origin: req.headers.origin,
    method: req.method
  });

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Preflight response
  }

  next();
});

app.use(express.json());
app.use(cookieParser());

// ✅ Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (email === DUMMY_USER.email) {
    const match = await bcrypt.compare(password, DUMMY_USER.passwordHash);
    if (match) {
      // Nastavíme session cookie
      res.cookie('session', 'valid-session-token', {
        httpOnly: true,
        sameSite: 'lax',
        secure: true // Pokud testuješ lokálně, můžeš zakomentovat
      });

      return res.json({ success: true });
    }
  }

  return res.status(401).json({ success: false, message: 'Neplatný email nebo heslo' });
});

// ✅ Logout endpoint
app.post('/api/logout', (req, res) => {
  res.clearCookie('session');
  res.json({ success: true });
});

// ✅ Kontrola session
app.get('/api/me', (req, res) => {
  if (req.cookies.session === 'valid-session-token') {
    res.json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

// ✅ Spuštění serveru
app.listen(PORT, () => {
  console.log(`🚀 Server běží na portu ${PORT}`);
});
