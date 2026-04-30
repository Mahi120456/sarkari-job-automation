function Widget({ title, children }) {
  return <section className="bg-white rounded-xl p-4 shadow-sm"><h3 className="font-bold mb-3">{title}</h3>{children}</section>;
}

function Sidebar({ posts }) {
  return (
    <div className="space-y-4 sticky top-24">
      <Widget title="Important Dates"><ul className="text-sm space-y-2"><li>UPSC Prelims: 26 May 2026</li><li>SSC CGL: 14 June 2026</li></ul></Widget>
      <Widget title="Popular This Week"><ul className="text-sm space-y-2">{posts.slice(0, 5).map((p) => <li key={p.id}>{p.title}</li>)}</ul></Widget>
      <Widget title="Join Telegram"><button className="w-full bg-sky-500 text-white py-3 rounded-lg min-h-12">Join Telegram Channel</button></Widget>
      <Widget title="Join WhatsApp"><button className="w-full bg-green-600 text-white py-3 rounded-lg min-h-12">Join WhatsApp Channel</button></Widget>
    </div>
  );
}

export default Sidebar;
