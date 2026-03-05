import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type Database from 'better-sqlite3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function runMigrations(db: Database.Database): void {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
  db.exec(schema);

  const count = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  if (count.count === 0) {
    const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
    db.exec(seed);
    console.log('Auth database seeded with sample users.');
  } else {
    console.log('Auth database already contains users, skipping seed.');
  }
}
