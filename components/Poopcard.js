import Link from 'next/link';

export default function Poopcard(props) {
  return (
    /* Card */
    <div className="w-88 max-w-md mx-2 p-2 bg-white rounded-xl shadow-lg mb-6">
      {/* Image */}
      <Link href={`/poops/${props.link}`}>
        <a>
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?zoom=18&size=362x192&maptype=roadmap&markers=anchor:32,10%7Cicon:https://bit.ly/32pSatn%7C${props.latitude},${props.longitude}&key=AIzaSyAgZpzR1cuZ1Pe77I8gsJJvKKboJsx_KYk`}
            alt="Map"
            className="h-48 w-full pl-1 object-cover rounded-xl"
          />
        </a>
      </Link>
      <div className="px-2 py-4">
        {/* Date */}
        <p className="pb-1 text-sm font-semibold text-pink-500">{props.date}</p>
        {/* Title */}
        <Link href={`/poops/${props.link}`}>
          <a>
            <h2 className="text-xl pb-1 font-bold text-gray-800">
              {props.title}
            </h2>
          </a>
        </Link>
        {/* Description */}
        <Link rel="preconnect" href={`/poops/${props.link}`}>
          <a>
            <p className="text-md text-gray-800">{props.description}</p>
          </a>
        </Link>
      </div>
    </div>
  );
}
