'use client';

import { useActionState, useState, useEffect } from 'react';

import { shareMeal } from '@/lib/actions';
import classes from './page.module.css';
import ImagePicker from '@/components/meals/image-picker';
import MealsFormSubmit from '@/components/meals/meals-form-submit';

function validateFiled(name, value) {
  switch (name) {
    case 'creator':
      if (!value.trim()) return '작성자를 입력해주세요.';
      break;
    case 'email':
      if (!value.trim()) return '이메일을 입력해주세요.';
      if (!value.includes('@')) return '유효한 이메일 주소를 입력해주세요.';
      break;
    case 'title':
      if (!value.trim()) return '제목을 입력해주세요.';
      break;
    case 'summary':
      if (!value.trim()) return '간단한 요약을 입력해주세요.';
      break;
    case 'instructions':
      if (!value.trim()) return '설명을 입력해주세요.';
      break;
    default:
      return null;
  }
  return null;
}

export default function ShareMealPage() {
  const [state, formAction] = useActionState(shareMeal, { validations: {}, values: {} });
  const [clientValidation, setClientValidation] = useState({});

  // 서버 validations이 갱신될 때마다 클라이언트 validations 초기화
  useEffect(() => {
    setClientValidation({});
  }, [state.validations]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    const errorMsg = validateFiled(name, value);

    setClientValidation((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  }

  const mergedValidations = {
    ...state.validations,
    ...clientValidation,
  };

  return (
    <>
      <header className={classes.header}>
        <h2>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h2>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction} noValidate>
          <div className={classes.row}>
            <div className={`${classes['input-group']} ${mergedValidations.creator ? classes['has-validation'] : ''}`}>
              <label htmlFor="creator">Your name</label>
              <input
                type="text"
                id="creator"
                name="creator"
                defaultValue={state.values?.creator || ''}
                onChange={handleInputChange}
              />
              {mergedValidations.creator && <span className="validation">{mergedValidations.creator}</span>}
            </div>
            <div className={`${classes['input-group']} ${mergedValidations.email ? classes['has-validation'] : ''}`}>
              <label htmlFor="creator_email">Your email</label>
              <input
                type="email"
                id="creator_email"
                name="email"
                defaultValue={state.values?.creator_email || ''}
                onChange={handleInputChange}
              />
              {mergedValidations.email && <span className="validation">{mergedValidations.email}</span>}
            </div>
            <div className={`${classes['input-group']} ${mergedValidations.password ? classes['has-validation'] : ''}`}>
              <label htmlFor="password">Delete Password</label>
              <input type="password" id="password" name="password" onChange={handleInputChange} />
              {mergedValidations.password && <span className="validation">{mergedValidations.password}</span>}
            </div>
          </div>
          <div className={`${classes['input-group']} ${mergedValidations.title ? classes['has-validation'] : ''}`}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={state.values?.title || ''}
              onChange={handleInputChange}
            />
            {mergedValidations.title && <span className="validation">{mergedValidations.title}</span>}
          </div>
          <div className={`${classes['input-group']} ${mergedValidations.summary ? classes['has-validation'] : ''}`}>
            <label htmlFor="summary">Short Summary</label>
            <input
              type="text"
              id="summary"
              name="summary"
              defaultValue={state.values?.summary || ''}
              onChange={handleInputChange}
            />
            {mergedValidations.summary && <span className="validation">{mergedValidations.summary}</span>}
          </div>
          <div
            className={`${classes['input-group']} ${mergedValidations.instructions ? classes['has-validation'] : ''}`}>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              defaultValue={state.values?.instructions || ''}
              onChange={handleInputChange}></textarea>
            {mergedValidations.instructions && <span className="validation">{mergedValidations.instructions}</span>}
          </div>
          <ImagePicker label="Your image" name="image" serverValidation={state.validations?.image} />
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
