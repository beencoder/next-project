'use server';

import { redirect } from 'next/navigation';

import { storePost } from '@/lib/posts';
import { uploadImage } from '@/lib/cloudinary';

export async function createPost(prevState, formData) {
  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');
  let errors = [];
  let imageUrl;

  if (!title || title.trim().length === 0) {
    errors.push('제목을 입력해주세요.');
  }
  if (!content || content.trim().length === 0) {
    errors.push('내용을 입력해주세요.');
  }
  if (!image || image.size === 0) {
    errors.push('이미지를 첨부해주세요.');
  }
  if (errors.length > 0) {
    return { errors };
  }

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error('이미지 업로드에 실패하여 게시물을 추가하지 못했습니다. 다시 시도해주세요.');
  }

  await storePost({
    imageUrl: imageUrl,
    title,
    content,
    userId: 1,
  });

  redirect('/feed');
}
