import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div>
      <Link href="/">
        <a>
          <Image src="hello" alt="This is the dog poop logo" />
        </a>
      </Link>
    </div>
  );
}
