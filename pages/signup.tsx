import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Bottomnav from '../components/Bottomnav';
import Header from '../components/Headercomp';
import { Errors } from '../util/types';
import { RegisterResponse } from './api/register';

type Props = { csrfToken: string };

export default function Signup(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const roleId = 2;
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Sign up - Dog Poop</title>
        <meta
          name="description"
          content="Pop Doog is the #1 dog poop reporter in the world."
        />
      </Head>
      <Header />
      <main>
        <div className="flex flex-col h-screen max-w-md mx-auto">
          <div className="mt-8 pl-4 pr-4">
            <p className="mb-8 text-2xl font-semibold text-gray-800">Sign up</p>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const registerResponse = await fetch('/api/register', {
                  method: 'POST',
                  headers: {
                    'content-type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    roleId: roleId,
                    csrfToken: props.csrfToken,
                  }),
                });
                const registerJson =
                  (await registerResponse.json()) as RegisterResponse;
                if ('errors' in registerJson) {
                  setErrors(registerJson.errors);
                  return;
                }
                const destination =
                  typeof router.query.returnTo === 'string' &&
                  router.query.returnTo
                    ? router.query.returnTo
                    : '/';
                router.push(destination);
              }}
            >
              <label className="block text-base font-semibold text-gray-800 mb-4">
                Username:
                <input
                  className="mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="username"
                  required
                  value={username}
                  onChange={(event) => {
                    setUsername(event.currentTarget.value);
                  }}
                />
              </label>
              <label className="block text-base font-semibold text-gray-800 mb-4">
                Email:
                <input
                  className="mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.currentTarget.value);
                  }}
                />
              </label>
              <label className="block text-base font-semibold text-gray-800 mb-4">
                Password:
                <input
                  type="password"
                  name="password"
                  required
                  className="mb-8 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.currentTarget.value);
                  }}
                />
              </label>
              <div className="flex justify-center">
                <button className="mb-8 text-xl bg-gradient-to-r from-pooppink-dark to-pooppink-light rounded text-white font-bold py-3 px-24">
                  Sign up
                </button>
              </div>
              <div className="text-base  text-red-500 mb-2">
                {errors.map((error) => (
                  <div key={`error-${error.message}`}>{error.message}</div>
                ))}
              </div>
            </form>
            <div className="block text-center">
              <p className="mb-8 text-xl font-medium">or</p>
              <Link href="/signin">
                <a>
                  <p className="text-xl font-bold text-pink-500">Sign in</p>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <Bottomnav />
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getValidSessionByToken } = await import('../util/database');
  const { createToken } = await import('../util/csrf');

  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/signup`,
        permanent: true,
      },
    };
  }

  const sessionToken = context.req.cookies.sessionToken;

  const session = await getValidSessionByToken(sessionToken);

  if (session) {
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: createToken(),
    },
  };
}
