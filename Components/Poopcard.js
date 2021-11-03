export default function Poopcard(props) {
  return (
    <div className="flex border-2 p-3 rounded shadow-sm mb-4">
      <img src="/images/minimap.png" alt="Map" className="w-32 h-auto" />
      <div className="flex flex-col ml-4">
        <p className="text-xs text-pink-700">{props.date}</p>
        <h2 className="text-lg font-bold">{props.title}</h2>
        <p className="text-xs">{props.author}</p>
      </div>
    </div>
  );
}
