'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import slugify from 'slugify';
import { supabaseAdmin } from './supabase-admin';
import { saveMeal } from './meals'; // DB에 URL만 저장하는 함수

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
    console.error('❌ Upload error:', uploadError);
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

  // DB에 URL 저장
  await saveMeal({
    ...meal,
    image: publicUrl,
  });

  revalidatePath('/meals'); // 캐시 무효화
  redirect('/meals');
}
