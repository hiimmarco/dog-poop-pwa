import Head from 'next/head';
import Layout from '../Components/Layout';

export default function Home() {
  return (
    <div>
      <Layout />
      <main>
        <div className="flex h-screen">
          <div className="m-auto text-center">
            <button className="mb-8 text-2xl bg-gradient-to-r from-pooppink-dark to-pooppink-light rounded text-white font-bold py-3 px-24">
              Sign up
            </button>
            <p className="mb-8 text-2xl font-medium">or</p>
            <p className="text-2xl font-bold text-pink-500">Sign in</p>
          </div>
        </div>
      </main>
    </div>
  );
}
