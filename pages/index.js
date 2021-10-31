import Head from 'next/head';
import Layout from '../Components/Layout';

export default function Home() {
  return (
    <div>
      <Layout />
      <main>
        <div classname="flex flex-col">
          <button className="pt-14">Sign in</button>
          <p>or</p>
          <p>Sign up</p>
        </div>
      </main>
    </div>
  );
}
