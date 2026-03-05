import { initializeDatabase } from './db/connection.js';
import { runMigrations } from './db/migrate.js';
import app from './app.js';

const PORT = process.env.AUTH_PORT || 3002;

const db = initializeDatabase();
runMigrations(db);

app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});
