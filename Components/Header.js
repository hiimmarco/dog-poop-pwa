import Image from 'next/image';
import Link from 'next/link';
import Headerlogo from '../public/dogpooplogo.png';

export default function Header() {
  return (
    <div className="h-16 flex flex-row items-center place-content-center border-b-4 filter drop-shadow-md">
      <Link href="/">
        <a>
          <img src="/dogpooplogo.png" alt="Dog Poop" className="h-9 w-auto" />
        </a>
      </Link>
    </div>
  );
}

{
  /* <Image
src={Headerlogo}
alt="Dog Poop Logo"
width="216px"
height="43px"
/> */
}
