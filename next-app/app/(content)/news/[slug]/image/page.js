import { notFound } from 'next/navigation';

import { getNewsItem } from '@/lib/news';

export default async function ImagePage({ params }) {
  const newsImageSlug = await params.slug;
  const newsItem = getNewsItem(newsImageSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
}
