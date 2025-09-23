'use client';

import { removeMeal } from '@/lib/actions';

export function DeleteMealBtn({ slug }) {
  async function handleDelete() {
    if (confirm('정말 삭제하시겠습니까?')) {
      await removeMeal(slug);
    }
  }

  return (
    <div className="right-area">
      <button type="button" className="delete-btn" onClick={handleDelete}>
        삭제
      </button>
    </div>
  );
}
