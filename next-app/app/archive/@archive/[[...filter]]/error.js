'use client';

export default function FilterError({ error }) {
  return (
    <div id="error">
      <h3>An error occurred!</h3>
      <p>{error.message}</p>
    </div>
  );
}
