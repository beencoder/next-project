import { notFound } from 'next/navigation';

import { DUMMY_NEWS } from '@/dummy-news';

export default async function ImagePage({ params }) {
  const newsImageSlug = await params.slug;
  const newsItem = DUMMY_NEWS.find((item) => item.slug === newsImageSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
}
