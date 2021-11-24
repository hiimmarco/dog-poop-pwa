import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
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
      <Layout />
      <div className="flex flex-col h-screen">
        <div className="mt-8 pl-4 pr-4">
          <p className="mb-8 text-2xl font-medium">Account</p>

          <p className="mb-2 text-base">
            Username:{' '}
            <span className="font-semibold">{props.user.userName}</span>
          </p>

          <Link href="/logout">
            <a>
              {' '}
              <p className="font-semibold text-pink-700 underline mb-8">
                Log out
              </p>
            </a>
          </Link>
          <p className="mb-8 text-xl font-medium">My added poop:</p>
          <div>
            {poopList.map((poop) => {
              return (
                <div key={`id-list-${poop.id}`}>
                  <Poopcard
                    title={poop.title}
                    date={poop.date}
                    link={poop.id}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={() => {
                      deletePoop(poop.id);
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
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
