import { Link } from 'react-router-dom';
import { MdPostAdd, MdMessage } from 'react-icons/md';

import classes from './MainHeader.module.css';

function MainHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.headerInner}>
        <h1 className={classes.logo}>
          <MdMessage />
          React Poster
        </h1>
        <div>
          <Link to="/create-post" className={classes.createBtn}>
            <MdPostAdd size={18} />
            New Post
          </Link>
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
