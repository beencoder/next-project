import Link from 'next/link';

import ImageSlideshow from '@/components/images/image-slideshow';
import classes from './page.module.css';

export default function Home() {
  return (
    <div className="contents-inner">
      <header className={classes.header}>
        <div className={classes.slideshow}>
          <ImageSlideshow />
        </div>
        <div className={classes['header-contents']}>
          <div className={classes.hero}>
            <h2 className={classes['hero-title']}>
              Connect <br />
              through <br />
              meals that <br />
              matter
            </h2>
            <p className={classes['hero-text']}>
              당신의 손끝에서 만들어진 레시피는 단순한 요리를 넘어, <br />
              사람과 사람을 연결하는 다리가 됩니다. <br />
              새로운 맛을 발견하고, 당신만의 이야기를 나누어 보세요.
            </p>
          </div>
          <div className="cta">
            <Link href="/community">함께하기</Link>
            <Link href="/meals">레시피 둘러보기</Link>
          </div>
        </div>
      </header>
      <main className={classes.main}>
        <section className={classes.contents}>
          <h3 className={classes.title}>How it works</h3>
          <p className={classes.text}>
            FoodieHub는 당신이 즐긴 한 끼와 소중한 레시피를 공유하는 공간입니다. <br />
            누군가의 식탁에서 시작된 요리가 또 다른 사람의 일상에 스며들며, 음식을 통해 서로가 연결되는 경험을
            제공합니다.
          </p>
        </section>

        <section className={classes.contents}>
          <h3 className={classes.title}>Why FoodieHub?</h3>
          <p className={classes.text}>
            FoodieHub는 단순한 레시피 저장소가 아닙니다. <br />
            여기서는 당신의 레시피가 다른 이들에게 영감이 되고, <br />또 다른 레시피가 당신의 일상에 새로운 맛을
            더합니다. <br />
            사람과 사람을 이어주는, 진짜 의미 있는 요리 경험을 만들어 보세요.
          </p>
        </section>
      </main>
    </div>
  );
}
