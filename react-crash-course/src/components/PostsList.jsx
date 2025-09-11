import { useState } from 'react';

import Modal from './Modal';
import NewPost from './NewPost';
import Post from './Post';
import classes from './PostsList.module.css';

function PostsList() {
  const [modalIsVisible, setModalIsVisible] = useState(true);
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

  function hideModalHandler() {
    setModalIsVisible(false);
  }

  function bodyChangeHandler(e) {
    setEnteredBody(e.target.value);
  }

  function authorChangeHandler(e) {
    setEnteredAuthor(e.target.value);
  }

  return (
    <>
      {modalIsVisible && (
        <Modal onClose={hideModalHandler}>
          <NewPost onChangeBody={bodyChangeHandler} onChangeAuthor={authorChangeHandler} />
        </Modal>
      )}
      <ul className={classes.posts}>
        <Post author={enteredAuthor} body={enteredBody} />
        <Post author="woogil" body="안녕하세요 반갑습니다 저는 김우봉이구요 영상디자이너로 재직 중에 있습니다" />
      </ul>
    </>
  );
}

export default PostsList;
