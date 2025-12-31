import Link from 'next/link';
import Image from 'next/image';

import MainHeaderBackground from '@/components/main-header/main-header-background';
import NavLink from '@/components/main-header/nav-link';
import logoImg from '@/assets/logo.png';
import classes from './main-header.module.css';

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <div className={classes['header-inner']}>
          <h1 className="sr-only">레시피 커뮤니티 사이트 푸디허브</h1>
          <Link className={classes.logo} href="/">
            <Image src={logoImg} alt="A plate with food on it" priority />
            FoodieHub
          </Link>

          <nav className={classes.nav}>
            <ul>
              <li>
                <NavLink href="/meals">Browse Meals</NavLink>
              </li>
              <li>
                <NavLink href="/community">Browse Community</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
