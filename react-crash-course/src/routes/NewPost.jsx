import { Link, Form, redirect } from 'react-router-dom';

import classes from './NewPost.module.css';
import Modal from '../components/Modal';

function NewPost() {
  return (
    <Modal>
      <Form method="post" className={classes.form}>
        <div className={classes.inputGroup}>
          <label htmlFor="body">Text</label>
          <textarea id="body" name="body" required rows={3} />
        </div>
        <div className={classes.inputGroup}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="author" required />
        </div>
        <div className={classes.actions}>
          <Link to="..">Cancel</Link>
          <button>Submit</button>
        </div>
      </Form>
    </Modal>
  );
}

export default NewPost;

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  await fetch('http://localhost:8080/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: { 'Content-Type': 'application/json' },
  });

  return redirect('/');
}
