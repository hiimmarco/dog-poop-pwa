import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Bottomnav from '../components/Bottomnav';
import Header from '../components/Headercomp';
import Poopcard from '../components/Poopcard';

export default function Account(props) {
  const [poopList, setPoopList] = useState(props.poops);
  // Create function to delete a specific poop
  async function deletePoop(id) {
    const poopsResponse = await fetch(`${props.baseUrl}/api/poops/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const deletedPoop = await poopsResponse.json();
    const newState = poopList.filter((poop) => poop.id !== deletedPoop.id);
    setPoopList(newState);
  }

  // Return elements
  return (
    <div>
      <Head>
        <title>Account - Dog Poop</title>
        <meta
          name="description"
          content="Pop Doog is the #1 dog poop reporter in the world."
        />
      </Head>
      <Header />
      <div className="flex flex-col h-screen max-w-md mx-auto">
        <div className="mt-8 pl-2 pr-2">
          <p className="mb-8 text-2xl font-semibold px-2 text-gray-800">
            Account
          </p>

          <p className="mb-2 px-2 text-md">
            Username:{' '}
            <span className="font-semibold">{props.user.userName}</span>
          </p>

          <Link href="/logout">
            <a>
              {' '}
              <p className="font-semibold text-pink-500 underline mb-8 px-2 text-lg">
                Log out
              </p>
            </a>
          </Link>
          <p className="mb-4 text-lg font-semibold px-2 text-gray-800">
            My added poop:
          </p>
          <div>
            {poopList.map((poop) => {
              return (
                <div key={`id-list-${poop.id}`}>
                  <Poopcard
                    title={poop.title}
                    date={poop.date}
                    link={poop.id}
                    latitude={poop.latitude}
                    longitude={poop.longitude}
                  />
                  <button
                    onClick={() => {
                      deletePoop(poop.id);
                    }}
                    className="mx-2 mb-12 px-4 py-2 text-xl  font-semibold flex flex-row rounded-lg border border-red-500 text-red-500"
                  >
                    Delete{'    '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 ml-2 pt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Bottomnav />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { getValidSessionByToken } = await import('../util/database');

  const sessionToken = context.req.cookies.sessionToken;

  const session = await getValidSessionByToken(sessionToken);

  if (!session) {
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
      redirect: {
        destination: '/signup?returnTo=/account',
        permanent: false,
      },
    };
  }
  const { getUserBySessionToken } = await import('../util/database');
  const { getPoopsByUserId } = await import('../util/database');
  const user = await getUserBySessionToken(context.req.cookies.sessionToken);
  const baseUrl = process.env.BASE_URL;
  const poops = await getPoopsByUserId(user.id);

  return {
    props: {
      user,
      poops,
      baseUrl,
    },
  };
}
