import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../Components/Layout';

export default function Poopdetail(props) {
  return (
    <div>
      <Layout />
      <div className="flex flex-col h-screen">
        <div className="mt-8 pl-4 pr-4">
          <p className=" text-xs">{props.poop.date}</p>
          <h1 className="mb-1 text-2xl font-medium">{props.poop.title}</h1>
          <p className="font-regular text-sm mb-6">by {props.poop.author}</p>
          <img
            src="/images/bigmap.png"
            alt="Map"
            width="375"
            height="250"
            className="mb-6"
          />
          <img
            src="https://maps.googleapis.com/maps/api/staticmap?zoom=18&size=600x300&maptype=roadmap&markers=color:pink%7Clabel:G%7C48.1957813,16.3425754&key=AIzaSyAgZpzR1cuZ1Pe77I8gsJJvKKboJsx_KYk"
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

/* export async function getServerSideProps(context: GetServerSidePropsContext) {
  const poopId = convertQueryValue(context.query.poopId);

  const { getPoopById } = await import('../../util/database');

  const poop = await getPoopById(poopId);

  return {
    props: {
      poop,
    },
  };
}
 */
