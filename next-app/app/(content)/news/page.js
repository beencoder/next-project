import { DUMMY_NEWS } from '@/dummy-news';
import NewsList from '@/components/news-list';

export default function newsPage() {
  return (
    <>
      <h2 className="contents-title">News Page</h2>
      <NewsList news={DUMMY_NEWS} />
    </>
  );
}
