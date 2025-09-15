import { Link } from 'react-router-dom';
import { MdPostAdd, MdMessage } from 'react-icons/md';

import classes from './MainHeader.module.css';

function MainHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.headerInner}>
        <h1 className={classes.logo}>
          <MdMessage size={28} />
          Leave a Mark
        </h1>
        <div>
          <Link to="/create-post" className={classes.createBtn}>
            <MdPostAdd size={24} />
            Make a Mark
          </Link>
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
