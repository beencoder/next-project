import { useLoaderData } from 'react-router-dom';

import Post from './Post';
import classes from './PostsList.module.css';

function PostsList() {
  const posts = useLoaderData();

  return (
    <div className="main-inner">
      {posts.length > 0 ? (
        <ul className={classes.posts}>
          {posts.map((post, i) => (
            <Post key={i} author={post.author} body={post.body} />
          ))}
        </ul>
      ) : (
        <div>
          <h2>포스트가 없습니다.</h2>
          <p>좌측 상단 New Post 버튼을 클릭하여 포스트를 추가해보세요!</p>
        </div>
      )}
    </div>
  );
}

export default PostsList;
