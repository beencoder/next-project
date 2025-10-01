'use server';

import { redirect } from 'next/navigation';

import { hashUserPassword, verifyPassword } from '@/lib/hash';
import { createUser, getUserByEmail } from '@/lib/user';
import { createAuthSession, destroySession } from '@/lib/auth';

export async function signup(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  let errors = {};

  if (!email.includes('@')) {
    errors.email = '유효한 이메일 주소를 입력해 주세요.';
  }
  if (password.trim().length < 8) {
    errors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
  }
  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  // 사용자 추가
  const hashedPassword = hashUserPassword(password);
  try {
    const id = createUser(email, hashedPassword);
    await createAuthSession(id);
    redirect('/training');
    s;
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return {
        errors: {
          email: '입력하신 이메일로 이미 계정이 존재하는 것 같습니다.',
        },
      };
    }
    throw error;
  }
}

export async function login(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: '사용자를 인증할 수 없으니 자격 증명을 확인해 주세요.',
      },
    };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    return {
      errors: {
        password: '사용자를 인증할 수 없으니 자격 증명을 확인해 주세요.',
      },
    };
  }

  await createAuthSession(existingUser.id);
  redirect('/training');
}

export async function auth(mode, prevState, formData) {
  if (mode === 'login') {
    return login(prevState, formData);
  }
  return signup(prevState, formData);
}

export async function logout() {
  await destroySession();
  redirect('/');
}
