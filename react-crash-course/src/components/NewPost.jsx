import classes from './NewPost.module.css';

function NewPost(props) {
  return (
    <form className={classes.form}>
      <div className={classes.inputGroup}>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={props.onChangeBody} />
      </div>
      <div className={classes.inputGroup}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={props.onChangeAuthor} />
      </div>
    </form>
  );
}

export default NewPost;
