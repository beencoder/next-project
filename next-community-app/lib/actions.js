'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';
import bcrypt from 'bcryptjs';

import { supabaseAdmin } from './supabase-admin';
import { getMeal, saveMeal, deleteMeal } from './meals';

function isInvalidText(text) {
  return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
  const file = formData.get('image');
  const meal = {
    creator: formData.get('creator'),
    creator_email: formData.get('email'),
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
  };
  const password = formData.get('password');
  const validations = {};

  // 유효성 검사
  if (isInvalidText(meal.creator)) {
    validations.creator = '작성자를 입력해주세요.';
  }
  if (isInvalidText(meal.creator_email)) {
    validations.email = '이메일을 입력해주세요.';
  } else if (!meal.creator_email.includes('@')) {
    validations.email = '유효한 이메일 주소를 입력해주세요.';
  }
  if (isInvalidText(meal.title)) {
    validations.title = '제목을 입력해주세요.';
  }
  if (isInvalidText(meal.summary)) {
    validations.summary = '간략한 요약을 입력해주세요.';
  }
  if (isInvalidText(meal.instructions)) {
    validations.instructions = '설명을 입력해주세요.';
  }
  if (!file || !(file instanceof File) || file.size === 0) {
    validations.image = '이미지를 업로드해주세요.';
  } else if (file.size > 1 * 1024 * 1024) {
    validations.image = '이미지는 1MB 이하만 업로드할 수 있습니다.';
  }
  if (isInvalidText(password) || String(password).length < 4) {
    validations.password = '비밀번호(4자 이상)를 입력해주세요.';
  }

  if (Object.keys(validations).length > 0) {
    return {
      validations,
      values: meal, // 입력값 유지
    };
  }

  // 파일 업로드 준비
  const slug = slugify(meal.title, { lower: true, strict: true }).trim() || `meal-${Date.now()}`;
  const originalName = String(file.name || 'image.jpg')
    .toLowerCase()
    .replace(/\s+/g, '-');
  const path = `${slug}/${originalName}`; // 버킷 내 경로

  // Supabase Storage에 업로드
  const { error: uploadError } = await supabaseAdmin.storage
    .from('meals') // 버킷명
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || 'image/jpeg',
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    return {
      message: 'Image upload failed.',
      values: meal,
    };
  }

  // 퍼블릭 URL 가져오기
  const { data } = supabaseAdmin.storage.from('meals').getPublicUrl(path);
  const publicUrl = data?.publicUrl;

  if (!publicUrl) {
    return {
      message: 'Could not get public URL.',
      values: meal,
    };
  }

  const password_hash = await bcrypt.hash(String(password), 10); //비밀번호 해시 저장

  // DB에 저장
  await saveMeal({
    ...meal,
    image: publicUrl,
    slug,
    password_hash,
  });

  revalidatePath('/meals'); // 캐시 무효화
  redirect('/meals');
}

export async function removeMeal(prevState, formData) {
  const slug = formData.get('slug');
  const password = formData.get('password');
  const meal = getMeal(slug);

  // 과거 더미/구버전 데이터 방어
  if (!meal.password_hash) {
    return { error: '이 게시물은 삭제 권한이 없습니다.' };
  }

  const completePassword = await bcrypt.compare(String(password || ''), meal.password_hash);
  if (!completePassword) {
    return { error: '비밀번호가 일치하지 않습니다.' };
  }

  // Supabase 이미지 삭제
  if (meal.image) {
    try {
      if (/^https?:\/\//.test(meal.image)) {
        // 퍼블릭 URL → 스토리지 객체 경로 추출
        const u = new URL(meal.image);
        const marker = '/storage/v1/object/public/meals/';
        const idx = u.pathname.indexOf(marker);
        if (idx !== -1) {
          const objectPath = u.pathname.slice(idx + marker.length); // slug/filename.jpg
          await supabaseAdmin.storage.from('meals').remove([objectPath]);
        }
      }
    } catch (e) {
      console.error('Supabase image remove failed (ignored):', e);
    }
  }

  deleteMeal(slug);
  revalidatePath('/meals');
  redirect('/meals');
}
