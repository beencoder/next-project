import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      <header className={classes.header}>
        <div className={classes['header-image']}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes['header-contents']}>
          <h2 className={classes.title}>{title}</h2>
          <p className={classes.creator}>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>레시피보기</Link>
        </div>
      </div>
    </article>
  );
}
