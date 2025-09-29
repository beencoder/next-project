export default function ArchiveLayout({ archive, latest }) {
  return (
    <div>
      <h2 className="contents-title">News Timeline</h2>
      <section id="archive-filter">{archive}</section>
      <section id="archive-latest">{latest}</section>
    </div>
  );
}
