import Head from 'next/head';
import Image from 'next/image';
import Layout from '../Components/Layout';

export default function Home() {
  return (
    <div>
      <Layout>
        <main>
          <p className="text-center bg-gray-300 mt-9 text-red-600">
            Hello there.
          </p>
        </main>
      </Layout>
    </div>
  );
}
