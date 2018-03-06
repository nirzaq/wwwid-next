export default function Content({ desc }) {
  return (
    <div className="content">
      <div dangerouslySetInnerHTML={{ __html: desc }} />
   </div>
  )
}
