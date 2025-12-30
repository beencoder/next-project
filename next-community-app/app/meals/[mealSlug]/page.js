import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getMeal } from '@/lib/meals';
// import { DeleteMealBtn } from '@/components/meals/meal-delete-button';
import DeleteMealForm from '@/components/meals/meal-delete-form';
import classes from './page.module.css';

export async function generateMetadata({ params }) {
  const { mealSlug } = await params;
  const meal = await getMeal(mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function MealDetailsPage({ params }) {
  const { mealSlug } = await params;
  const meal = await getMeal(mealSlug);

  if (!meal) {
    notFound();
  }

  // instructions가 없을 경우 대비
  const formattedInstructions = meal.instructions ? meal.instructions.replace(/\n/g, '<br />') : '';

  return (
    <div className="contents-inner">
      <header className={classes.header}>
        <div className={classes['header-image']}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes['header-contents']}>
          <h2 className={classes.title}>{meal.title}</h2>
          <p className={classes.creator}>
            by <a href={`mailto: ${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main className={classes.main}>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: formattedInstructions,
          }}></p>

        <DeleteMealForm slug={meal.slug} />
      </main>
    </div>
  );
}
