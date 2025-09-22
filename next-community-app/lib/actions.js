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
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  // 유효성 검사
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !file ||
    file.size === 0
  ) {
    return {
      message: 'Invalid Input.',
      values: meal, // 폼 값 유지
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
