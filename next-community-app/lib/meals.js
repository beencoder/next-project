import Database from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = new Database('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //throw new Error('Loading meals failed');
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true, strict: true }).trim();
  if (!meal.slug) meal.slug = `meal-${Date.now()}`; // slugify가 빈 값일 경우 대체값 부여
  meal.instructions = xss(meal.instructions ?? '');

  // const extension = meal.image.name.split('.').pop();
  // const fileName = `${meal.slug}.${extension}`;
  // const buffer = Buffer.from(await meal.image.arrayBuffer());

  // await new Promise((resolve, reject) => {
  //   const stream = fs.createWriteStream(`public/images/${fileName}`);
  //   stream.on('error', reject);
  //   stream.on('finish', resolve);
  //   stream.end(buffer);
  // });

  // meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT OR IGNORE INTO meals (
      title, summary, instructions, creator, creator_email, image, slug
    ) VALUES (
      @title, @summary, @instructions, @creator, @creator_email, @image, @slug
    )
    `,
  ).run(meal);
}
