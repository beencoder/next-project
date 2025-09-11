import { MdPostAdd, MdMessage } from 'react-icons/md';

import classes from './MainHeader.module.css';

function MainHeader({ onCreatePost }) {
  return (
    <header className={classes.header}>
      <div className={classes.headerInner}>
        <h1 className={classes.logo}>
          <MdMessage />
          React Poster
        </h1>
        <button className={classes.createBtn} onClick={onCreatePost}>
          <MdPostAdd size={18} />
          New Post
        </button>
      </div>
    </header>
  );
}

export default MainHeader;
