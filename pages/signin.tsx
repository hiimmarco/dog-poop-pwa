import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useState } from 'react';
import Bottomnav from '../components/Bottomnav';
import Header from '../components/Headercomp';
import { Errors } from '../util/types';
import { LoginResponse } from './api/login';

export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const roleId = 2;
  const router = useRouter();

  return (
    <div>
      <Header />
      <main>
        <div className="flex flex-col h-screen max-w-md mx-auto">
          <div className="mt-8 pl-4 pr-4">
            <p className="mb-8 text-2xl font-medium">Sign in</p>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const loginResponse = await fetch('/api/login', {
                  method: 'POST',
                  headers: {
                    'content-type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: username,
                    password: password,
                    roleId: roleId,
                  }),
                });
                const loginJson = (await loginResponse.json()) as LoginResponse;
                if ('errors' in loginJson) {
                  setErrors(loginJson.errors);
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
              <label className="block text-base font-semibold mb-4">
                Username:
                <input
                  className="mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.currentTarget.value);
                  }}
                />
              </label>

              <label className="block text-base font-semibold mb-2">
                Password:
                <input
                  type="password"
                  className="mb-8 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.currentTarget.value);
                  }}
                />
              </label>

              <button className="mb-8 text-xl bg-gradient-to-r from-pooppink-dark to-pooppink-light rounded text-white font-bold py-3 px-24">
                Sign in
              </button>
              <div className="text-base  text-red-600">
                {errors.map((error) => (
                  <div key={`error-${error.message}`}>{error.message}</div>
                ))}
              </div>
            </form>
            <p className="mb-8 text-xl font-medium">or</p>
            <Link href="/signup">
              <a>
                <p className="text-xl font-bold text-pink-500">Sign up</p>
              </a>
            </Link>
          </div>
        </div>
        <Bottomnav />
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getValidSessionByToken } = await import('../util/database');

  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/signin`,
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
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
