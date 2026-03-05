import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { getDatabase } from '../db/connection.js';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'intelligent-investor-secret';

interface UserRow {
  id: number;
  username: string;
  password: string;
}

router.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required' });
    return;
  }

  const db = getDatabase();
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as UserRow | undefined;

  if (!user || user.password !== `enc_${password}`) {
    res.status(401).json({ error: 'Invalid username or password' });
    return;
  }

  const token = jwt.sign(
    { user_id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({ token, user: { id: user.id, username: user.username } });
});

router.post('/auth/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required' });
    return;
  }

  const db = getDatabase();

  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (existing) {
    res.status(409).json({ error: 'Username already exists' });
    return;
  }

  const result = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(
    username,
    `enc_${password}`
  );

  const userId = result.lastInsertRowid as number;

  const token = jwt.sign(
    { user_id: userId, username },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.status(201).json({ token, user: { id: userId, username } });
});

router.get('/auth/me', (req, res) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid Authorization header' });
    return;
  }

  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { user_id: number; username: string };
    res.json({ user_id: payload.user_id, username: payload.username });
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

export default router;
