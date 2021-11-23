import Link from 'next/link';

export default function Poopcard(props) {
  return (
    <div className="flex border-2 p-3 rounded shadow-sm mb-4">
      <Link href={`/poops/${props.link}`}>
        <a>
          <img src="/images/minimap.png" alt="Map" className="w-32 h-auto" />
        </a>
      </Link>
      <div className="flex flex-col ml-4">
        <p className="text-xs text-pink-700">{props.date}</p>
        <Link href={`/poops/${props.link}`}>
          <a>
            <h2 className="text-lg font-semibold text-gray-700">
              {props.title}
            </h2>
          </a>
        </Link>
      </div>
    </div>
  );
}
