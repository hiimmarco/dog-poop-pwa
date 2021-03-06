import Link from 'next/link';

export default function Bottomnav() {
  const homeColor = 'text-gray-400';
  const mapColor = 'text-gray-400';
  const accountColor = 'text-gray-400';

  return (
    <div>
      <nav className="fixed mx-auto bottom-0 inset-x-0 bg-white border-t-2 border-gray-100">
        <ul className="flex flex-row justify-evenly text-xs">
          <Link href="/">
            <a
              className={`w-full block py-2.5 px-3 text-center border-r-2 ${homeColor}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mb-0.5 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>

              <li>Home</li>
            </a>
          </Link>
          <Link href="/map">
            <a
              className={`w-full block py-2.5 px-3 text-center border-r-2 ${mapColor}`}
            >
              <svg
                className="w-5 h-5 mb-0.5 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                  clipRule="evenodd"
                />
              </svg>
              <li>Map</li>
            </a>
          </Link>
          <Link href="/account">
            <a
              className={`w-full block py-2.5 px-3 text-center ${accountColor}`}
            >
              <svg
                className="w-5 h-5 mb-0.5 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <li>Account</li>
            </a>
          </Link>
          <Link href="/addpoop">
            <a className="w-full block  pt-2 px-3 text-center bg-gradient-to-r from-pooppink-dark to-pooppink-light">
              <svg
                className="w-11 h-11 mx-auto text-white place-content-center"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
