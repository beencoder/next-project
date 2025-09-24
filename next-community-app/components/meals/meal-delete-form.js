'use client';

import { useActionState } from 'react';
import { removeMeal } from '@/lib/actions';

export default function DeleteMealForm({ slug }) {
  const [state, formAction] = useActionState(removeMeal, { error: null });

  return (
    <section className="delete-section">
      <form action={formAction} noValidate>
        <div className="input-group">
          <input type="hidden" name="slug" value={slug} />
          <label htmlFor="delPw">비밀번호</label>
          <input type="password" id="delPw" name="password" />
          {state?.error && <span className="validation">{state.error}</span>}
        </div>
        <button type="submit" className="delete-btn">
          삭제하기
        </button>
      </form>
    </section>
  );
}
