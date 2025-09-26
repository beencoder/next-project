'use client';

import { notFound, useRouter } from 'next/navigation';

import { DUMMY_NEWS } from '@/dummy-news';

export default async function InterceptedImagePage({ params }) {
  const router = useRouter();
  const newsImageSlug = await params.slug;
  const newsItem = DUMMY_NEWS.find((item) => item.slug === newsImageSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <div className="modal-backdrop" onClick={router.back} />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
