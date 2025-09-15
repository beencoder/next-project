import { Link, Form, redirect } from 'react-router-dom';

import classes from './NewPost.module.css';
import Modal from '../components/Modal';

function NewPost() {
  return (
    <Form method="post" className={classes.form}>
      <Modal
        modalTitle="게시글 작성"
        footer={
          <>
            <Link to="..">취소</Link>
            <button>확인</button>
          </>
        }>
        <div className={classes.inputGroup}>
          <label htmlFor="body">내용</label>
          <textarea id="body" name="body" required rows={3} maxLength={100} />
        </div>
        <div className={classes.inputGroup}>
          <label htmlFor="name">작성자</label>
          <input type="text" id="name" name="author" required />
        </div>
      </Modal>
    </Form>
  );
}

export default NewPost;

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData); // { body: '...', author: '...' }
  await fetch('http://localhost:8080/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: { 'Content-Type': 'application/json' },
  });

  return redirect('/');
}
