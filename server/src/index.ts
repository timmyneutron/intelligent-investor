import { initializeDatabase } from './db/connection.js';
import { runMigrations } from './db/migrate.js';
import app from './app.js';

const PORT = process.env.PORT || 3000;

const db = initializeDatabase();
runMigrations(db);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
