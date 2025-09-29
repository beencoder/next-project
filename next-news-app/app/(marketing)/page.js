import logo from '@/assets/logo.jpg';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div id="home">
      <img src={logo.src} alt="A newspaper" />
      <h2 className="home-title">A News Site For The Next Generation</h2>
      <p className="home-text">Next News is here to deliver you all the latest news - concise & unbiased!</p>

      <p className="home-text">
        NextNews aims to provide you with the latest news in a concise and unbiased manner. We strive to deliver the
        news in a way that is easy to understand and to the point. We want to keep you informed without overwhelming you
        with unnecessary information.
      </p>

      <p className="home-text">
        We employ a team of dedicated journalists who are committed to delivering the news in a fair and unbiased
        manner. Our team is passionate about keeping you informed and up to date with the latest news.
      </p>

      <p className="cta-btn">
        <Link href="/news">Read the latest news</Link>
      </p>
    </div>
  );
}
