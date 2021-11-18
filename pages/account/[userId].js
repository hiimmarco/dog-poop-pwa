import { GetServerSidePropsContext } from 'next';
import Layout from '../../Components/Layout';
import Poopcard from '../../Components/Poopcard';

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
          <p className="font-semibold text-pink-700 underline mb-8">Log out</p>
          <p className="mb-8 text-xl font-medium">My added poop:</p>
          <Poopcard />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { getUser } = await import('../../util/database.ts');

  const user = await getUser(context.query.userId);
  console.log(user);
  return {
    props: {
      user: user,
    },
  };
}

// Get only the poops connected to the specific user

/* export async function getServerSideProps(context) {
  const { getUserById } = await import('../util/database');

  const poops = await getPoopsByUserId(context.query.accountId);

  return {
    props: {
      poops,
    },
  };
} */
