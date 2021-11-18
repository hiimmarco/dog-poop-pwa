import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../Components/Layout';
import { Poops } from '../../util/database';

type Props = {
  poop: Poops;
};

export default function Poopdetail(props: Props) {
  return (
    <div>
      <Layout />
      <div className="flex flex-col h-screen">
        <div className="mt-8 pl-4 pr-4">
          <p className=" text-xs">{props.poop.date}</p>
          <h1 className="mb-1 text-2xl font-medium">{props.poop.title}</h1>
          <p className="font-regular text-sm mb-6">by {props.poop.author_id}</p>

          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?zoom=18&size=600x300&maptype=roadmap&markers=color:pink%7Clabel:G%7C${props.poop.latitude},${props.poop.longitude}&key=AIzaSyAgZpzR1cuZ1Pe77I8gsJJvKKboJsx_KYk`}
            alt="Map"
          />
          <p className="text-base mb-6">{props.poop.description}</p>
          <Link href="/home">
            <a>
              <p className="font-semibold text-pink-700 underline mb-8">
                Back to home
              </p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getPoop } = await import('../../util/database');

  const poop = await getPoop(Number(context.query.poopId));

  const { getValidSessionByToken } = await import('../../util/database');

  const sessionToken = context.req.cookies.sessionToken;

  const session = await getValidSessionByToken(sessionToken);

  console.log(session);

  if (!session) {
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
      redirect: {
        destination: '/signin?returnTo=/map',
        permanent: false,
      },
    };
  }

  return {
    props: {
      poop,
    },
  };
}
