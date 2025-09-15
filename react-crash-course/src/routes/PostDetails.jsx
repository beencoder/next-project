import { useLoaderData, Link } from 'react-router-dom';

import Modal from '../components/Modal';
import classes from './PostDetails.module.css';

function PostDetails() {
  const post = useLoaderData();

  if (!post) {
    return (
      <Modal modalTitle="에러" footer={<Link to="..">닫기</Link>}>
        <main className={classes.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
        </main>
      </Modal>
    );
  }
  return (
    <Modal modalTitle="게시글 상세" footer={<Link to="..">닫기</Link>}>
      <main className={classes.details}>
        <div className={`${classes.author} ${classes.content}`}>
          <span className={classes.fixText}>작성자 </span>
          <span className={classes.text}>{post.author}</span>
        </div>
        <div className={`${classes.body} ${classes.content}`}>
          <span className={classes.fixText}>남긴 말 </span>
          <span className={classes.text}>{post.body.replace(/\n/g, ' ')}</span>
        </div>
      </main>
    </Modal>
  );
}

export default PostDetails;

export async function loader({ params }) {
  const response = await fetch(`http://localhost:8080/posts/${params.postId}`);
  const resData = await response.json();

  return resData.post;
}
