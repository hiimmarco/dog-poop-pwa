import Link from 'next/link';
import Header from '../components1/Header';

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <div className="flex h-screen">
          <div className="m-auto text-center">
            <Link href="/signup">
              <a>
                <button className="mb-8 text-xl bg-gradient-to-r from-pooppink-dark to-pooppink-light rounded text-white font-bold py-3 px-24">
                  Sign up
                </button>
              </a>
            </Link>
            <p className="mb-8 text-xl font-medium">or</p>
            <Link href="/signin">
              <a>
                <p className="text-xl font-bold text-pink-500">Sign in</p>
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
