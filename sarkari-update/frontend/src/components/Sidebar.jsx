function Sidebar({ latest = [], popular = [] }) {
  const Box = ({ title, list }) => (
    <section className="bg-white border rounded-lg p-4">
      <h3 className="font-bold text-navy border-b pb-2 mb-3">{title}</h3>
      <ul className="space-y-2 text-sm">
        {list.map((item) => (
          <li key={item.id} className="border-b pb-2 last:border-b-0">{item.title}</li>
        ))}
      </ul>
    </section>
  );

  return (
    <div className="space-y-4">
      <Box title="Latest Posts" list={latest} />
      <Box title="Popular Posts" list={popular} />
    </div>
  );
}

export default Sidebar;
