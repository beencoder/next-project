import { supabaseAdmin } from './supabase-admin';
import xss from 'xss';

// 모든 레시피 가져오기
export async function getMeals() {
  const { data, error } = await supabaseAdmin.from('meals').select('*').order('id', { ascending: false });

  if (error) {
    console.error(error);
    throw new Error('레시피를 불러오지 못했습니다.');
  }
  return data;
}

// 특정 레시피 가져오기
export async function getMeal(slug) {
  const { data, error } = await supabaseAdmin.from('meals').select('*').eq('slug', slug).single();

  if (error) return null;
  return data;
}

// 레시피 저장하기
export async function saveMeal(meal) {
  meal.instructions = xss(meal.instructions ?? '');

  const { error } = await supabaseAdmin.from('meals').insert([
    {
      title: meal.title,
      summary: meal.summary,
      instructions: meal.instructions,
      creator: meal.creator,
      creator_email: meal.creator_email,
      image: meal.image,
      slug: meal.slug,
      password_hash: meal.password_hash,
    },
  ]);

  if (error) {
    console.error(error);
    throw new Error('데이터베이스 저장 실패');
  }
}

// 레시피 삭제하기
export async function deleteMeal(slug) {
  const { error } = await supabaseAdmin.from('meals').delete().eq('slug', slug);

  if (error) {
    console.error(error);
    throw new Error('데이터베이스 삭제 실패');
  }
}
