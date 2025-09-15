import { useLoaderData } from 'react-router-dom';
import { MdEditNote } from 'react-icons/md';

import Post from './Post';
import classes from './PostsList.module.css';

function PostsList() {
  const posts = useLoaderData();

  return (
    <div className="main-inner">
      {posts.length > 0 ? (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.id} id={post.id} author={post.author} body={post.body} />
          ))}
        </ul>
      ) : (
        <div className={classes.noData}>
          <MdEditNote className={classes.icon} size={100} />
          <h2 className={classes.title}>아직 아무도 흔적을 남기지 않았어요.</h2>
          <p className={classes.text}>당신의 첫 흔적을 Make a Mark로 남겨주세요.</p>
        </div>
      )}
    </div>
  );
}

export default PostsList;
