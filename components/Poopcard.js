import Link from 'next/link';

export default function Poopcard(props) {
  return (
    /* Card */
    <div className="w-80 p-2 bg-white rounded-xl shadow-lg mb-6">
      {/* Image */}
      <Link href={`/poops/${props.link}`}>
        <a>
          <img
            src="/images/minimap.png"
            alt="Map"
            className="h-56 pl-1 object-cover rounded-xl"
          />
        </a>
      </Link>
      <div className="px-2 py-4">
        {/* Date */}
        <p className="pb-1 text-sm font-semibold text-pink-500">{props.date}</p>
        {/* Title */}
        <Link href={`/poops/${props.link}`}>
          <a>
            <h2 className="text-xl pb-1 font-bold text-gray-700">
              {props.title}
            </h2>
          </a>
        </Link>
        {/* Description */}
        <Link href={`/poops/${props.link}`}>
          <a>
            <p className="text-md text-gray-600">{props.description}</p>
          </a>
        </Link>
      </div>
    </div>
  );
}
