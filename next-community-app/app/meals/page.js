import { Suspense } from 'react';
import Link from 'next/link';

import classes from './page.module.css';
import MealsList from '@/components/meals/meals-list';
import { getMeals } from '@/lib/meals';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
};

async function Meals() {
  const meals = await getMeals();

  return <MealsList meals={meals} />;
}

export default function MealsPage() {
  return (
    <div className="contents-inner">
      <header className={classes.header}>
        <h2 className={classes['header-title']}>
          Delicious meals, created <span className={classes.highlight}>by you</span>
        </h2>
        <p className={classes['header-text']}>누군가의 식탁에서 시작된 레시피, 이제 당신의 주방에서 이어가 보세요.</p>
        <p className="cta">
          <Link href="/meals/share">레시피 공유하기</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Loading...</p>}>
          <Meals />
        </Suspense>
      </main>
    </div>
  );
}
