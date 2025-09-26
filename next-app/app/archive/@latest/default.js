import NewsList from '@/components/news-list';
import { getLatestNews } from '@/lib/news';

export default function LatestNewsPage() {
  const latestNews = getLatestNews();

  return (
    <>
      <h3 className="filter-title mb20">Latest News</h3>
      <NewsList news={latestNews} />
    </>
  );
}
