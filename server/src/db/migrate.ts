import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type Database from 'better-sqlite3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function runMigrations(db: Database.Database): void {
  db.exec('DROP TABLE IF EXISTS transactions');
  db.exec('DROP TABLE IF EXISTS accounts');
  db.exec('DROP TABLE IF EXISTS users');
  
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
  db.exec(schema);

  const count = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  if (count.count === 0) {
    const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
    db.exec(seed);
    console.log('Database seeded with sample data.');
  } else {
    console.log('Database already contains data, skipping seed.');
  }
}

export function resetDatabase(db: Database.Database): void {
  db.exec('DROP TABLE IF EXISTS transactions');
  db.exec('DROP TABLE IF EXISTS accounts');
  db.exec('DROP TABLE IF EXISTS users');

  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
  db.exec(schema);

  const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
  db.exec(seed);
  console.log('Database reset to seed data.');
}
