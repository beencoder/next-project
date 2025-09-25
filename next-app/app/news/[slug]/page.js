import { notFound } from 'next/navigation';

import { DUMMY_NEWS } from '@/dummy-news';

export default async function NewsDetailPage({ params }) {
  const newsSlug = await params.slug;
  const newsItem = DUMMY_NEWS.find((item) => item.slug === newsSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <article className="news-article">
      <header>
        <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        <div className="header-inner">
          <h2 className="news-title">{newsItem.title}</h2>
          <span className="news-info">{newsItem.author}</span>
          <time className="news-info" dateTime={newsItem.date}>
            | {newsItem.date}
          </time>
        </div>
      </header>
      <main>
        <p className="news-content">{newsItem.content}</p>
      </main>
    </article>
  );
}
