import Layout from '../Components/Layout';
import Poopcard from '../Components/Poopcard';

export default function Account() {
  return (
    <div>
      <Layout />
      <div className="flex flex-col h-screen">
        <div className="mt-8 pl-4 pr-4">
          <p className="mb-8 text-2xl font-medium">Account</p>

          <p className="mb-2 text-base">
            Username: <span className="font-semibold">Max Moser</span>
          </p>
          <p className="font-semibold text-pink-700 underline mb-8">Log out</p>
          <p className="mb-8 text-xl font-medium">My added poop:</p>
          <Poopcard />
          <Poopcard />
          <Poopcard />
          <Poopcard />
        </div>
      </div>
    </div>
  );
}

// Get only the poops connected to the specific user

/* export async function getServerSideProps(context) {
  const { getPoopsByUserId } = await import('../util/database');

  const poops = await getPoopsByUserId(context.query.accountId);

  return {
    props: {
      poops,
    },
  };
} */
