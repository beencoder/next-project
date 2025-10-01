import db from './db';

export function createUser(email, password) {
  const result = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run(email, password);

  return result.lastInsertRowid; // 마지막으로 추가된 행의 고유 ID
}

export function getUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}
