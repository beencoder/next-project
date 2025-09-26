import MainHeader from '@/components/main-header';

export const metadata = {
  title: 'Next.js Page Routing & Rendering',
  description: 'Learn how to route to different pages.',
};

export default function ContentLayout({ children }) {
  return (
    <body id="page">
      <MainHeader />
      <div className="contents-inner">{children}</div>
    </body>
  );
}
