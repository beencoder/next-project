export default async function NewsDetailPage({ params }) {
  const newsSlug = await params;

  return (
    <>
      <div>뉴스 상세페이지입니다.</div>
    </>
  );
}
