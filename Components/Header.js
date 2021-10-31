import Link from 'next/link';

export default function Header() {
  return (
    <div className="fixed top-0 inset-x-0 bg-white h-16 flex flex-row items-center place-content-center filter drop-shadow-md">
      <div>
        <Link href="/">
          <a>
            <img src="/dogpooplogo.png" alt="Dog Poop" className="h-9 w-auto" />
          </a>
        </Link>
      </div>
      <div
        className="filter border-gray-100 border-b-2 border-opacity-0.1
    drop-shadow-md"
      />
    </div>
  );
}

{
  // Eventually for later use:
  /* <Image
src={Headerlogo}
alt="Dog Poop Logo"
width="216px"
height="43px"
import Image from 'next/image';
import Headerlogo from '../public/dogpooplogo.png';
/> */
}
