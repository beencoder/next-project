'use client';

import { useActionState } from 'react';
import { removeMeal } from '@/lib/actions';

export default function DeleteMealForm({ slug }) {
  const [state, formAction] = useActionState(removeMeal, { error: null });

  return (
    <form action={formAction} noValidate>
      <input type="hidden" name="slug" value={slug} />
      <label htmlFor="delpw">삭제 비밀번호</label>
      <input type="password" id="delpw" name="password" />
      {state?.error && <p className="validation">{state.error}</p>}
      <button type="submit" className="danger">
        Delete
      </button>
    </form>
  );
}
