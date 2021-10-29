import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div>
      <Link href="/">
        <a>
          <Image src="/favicon.png" alt="This is the poop logo" layout="fill" />
        </a>
      </Link>
    </div>
  );
}
