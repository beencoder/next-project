import { useState, useEffect } from 'react';

import Modal from './Modal';
import NewPost from './NewPost';
import Post from './Post';
import classes from './PostsList.module.css';

function PostsList({ isPosting, onStopPosting }) {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);

      try {
        const response = await fetch('http://localhost:8080/posts');

        if (!response.ok) {
          throw new Error('게시글을 불러오지 못했습니다!');
        }

        const resData = await response.json();
        setPosts(resData.posts);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsFetching(false);
      }
    }

    fetchPosts();
  }, []);

  async function addPostHandler(postData) {
    try {
      const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('게시글을 저장하지 못했습니다!');
      }

      const resData = await response.json();
      setPosts((existingPosts) => [resData.post, ...existingPosts]);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="main-inner">
      {isPosting && (
        <Modal onCloseModal={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      {!isFetching &&
        (posts.length > 0 ? (
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
        ))}
      {isFetching && (
        <div>
          <p>Loading posts...</p>
        </div>
      )}
    </div>
  );
}

export default PostsList;
