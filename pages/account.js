import Link from 'next/link';
import Layout from '../Components/Layout';
import Poopcard from '../Components/Poopcard';

export default function Account(props) {
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
            {props.poops.map((poop) => {
              return (
                <div key={`id-list-${poop.id}`}>
                  <Poopcard
                    title={poop.title}
                    date={poop.date}
                    link={poop.id}
                  />
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

  const poops = await getPoopsByUserId(user.id);

  return {
    props: {
      user,
      poops,
    },
  };
}
