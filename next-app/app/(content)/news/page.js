import NewsList from '@/components/news-list';
import { getAllNews } from '@/lib/news';

export default async function newsPage() {
  const news = await getAllNews();

  return (
    <>
      <h2 className="contents-title">News Page</h2>
      <NewsList news={news} />
    </>
  );
}
