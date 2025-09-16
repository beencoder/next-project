import Database from 'better-sqlite3';
const db = new Database('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //throw new Error('Loading meals failed');
  return db.prepare('SELECT * FROM meals').all();
}
