import NewsList from '@/components/news-list';

export default async function newsPage() {
  const response = await fetch('http://localhost:8080/news');
  const news = await response.json();

  if (!response.ok) {
    throw new Error('뉴스를 불러오지 못했습니다.');
  }

  return (
    <>
      <h2 className="contents-title">News Page</h2>
      <NewsList news={news} />
    </>
  );
}
