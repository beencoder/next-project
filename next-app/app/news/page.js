import Link from 'next/link';

export default function newsPage() {
  return (
    <>
      <div className="contents-inner">
        <header>뉴스페이지</header>
        <main>
          <Link href="/news/news1">뉴스1</Link> <br />
          <Link href="/news/news2">뉴스2</Link>
        </main>
      </div>
    </>
  );
}
