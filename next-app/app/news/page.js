import Link from 'next/link';

import { DUMMY_NEWS } from '@/dummy-news';

export default function newsPage() {
  return (
    <>
      <h2 className="contents-title">News Page</h2>
      <ul className="news-list">
        {DUMMY_NEWS.map((newsItem) => (
          <li key={newsItem.id}>
            <Link href={`news/${newsItem.slug}`}>
              <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
              <span className="list-title">{newsItem.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
