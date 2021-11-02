export default function Poopcard() {
  return (
    <div className="flex border-2 p-3 rounded shadow-sm mb-4">
      <img src="/images/minimap.png" alt="Map" className="w-32 h-auto" />
      <div className="flex flex-col ml-4">
        <p className="text-sm text-pink-700">23.12.2024</p>
        <h2 className="text-base font-bold">Dogpoop at Schwedenplatz</h2>
        <p className="text-xs">by Max Moser</p>
      </div>
    </div>
  );
}
