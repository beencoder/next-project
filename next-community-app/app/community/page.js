import Image from 'next/image';

import mealIcon from '@/assets/icons/meal.png';
import communityIcon from '@/assets/icons/community.png';
import eventsIcon from '@/assets/icons/events.png';
import classes from './page.module.css';

export default function CommunityPage() {
  return (
    <>
      <header className={classes.header}>
        <h2 className={classes['header-title']}>
          One shared passion: <span className={classes.highlight}>Food</span>
        </h2>
        <p className={classes['header-text']}>Join our community and share your favorite recipes!</p>
      </header>
      <main className={classes.main}>
        <h3 className={classes['main-title']}>Community Perks</h3>

        <ul className={classes.perks}>
          <li>
            <Image src={mealIcon} alt="A delicious meal" />
            <p className={classes['perk-text']}>Share & discover recipes</p>
          </li>
          <li>
            <Image src={communityIcon} alt="A crowd of people, cooking" />
            <p className={classes['perk-text']}>Find new friends & like-minded people</p>
          </li>
          <li>
            <Image src={eventsIcon} alt="A crowd of people at a cooking event" />
            <p className={classes['perk-text']}>Participate in exclusive events</p>
          </li>
        </ul>
      </main>
    </>
  );
}
