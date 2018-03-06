export default function Excerpt({ desc }) {
  return (
    <div className="Excerpt">
      <div dangerouslySetInnerHTML={{ __html: desc }} />
    </div>
  );
}
