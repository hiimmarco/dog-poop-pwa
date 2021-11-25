import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { Baseurl, Poops, Username } from '../../util/database';

type Props = {
  poop: Poops;
  user: Username;
  baseUrl: Baseurl;
};

export default function Poopdetail(props: Props) {
  return (
    <div>
      <Head>
        <title>{props.poop.title} - Dog Poop</title>
        <meta name="description" content={props.poop.description} />
      </Head>
      <Layout />
      <div className="flex flex-col h-screen max-w-xl mx-auto">
        <div className="mt-8 pl-4 pr-4">
          <p className=" text-sm font-semibold text-pink-500">
            {props.poop.date}
          </p>
          <h1 className="mb-1 text-2xl font-bold text-gray-800">
            {props.poop.title}
          </h1>
          <p className="font-regular text-sm mb-6 text-gray-800">
            by {props.user.userName}
          </p>

          <Image
            src={`https://maps.googleapis.com/maps/api/staticmap?zoom=18&size=600x300&maptype=roadmap&markers=anchor:32,10%7Cicon:https://bit.ly/32pSatn%7C${props.poop.latitude},${props.poop.longitude}&key=${props.baseUrl}`}
            alt="Picture of the author"
            width={600}
            height={300}
            className="rounded-xl"
          />
          <p className="text-base mt-6 mb-6 text-gray-800">
            {props.poop.description}
          </p>
          <Link href="/">
            <a>
              <p className="font-semibold text-pink-500 underline mb-8">
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
  const baseUrl = process.env.GOOGLE_API;
  const { getPoop } = await import('../../util/database');
  const { getUserByPoopId } = await import('../../util/database');
  const poop = await getPoop(Number(context.query.poopId));
  const user = await getUserByPoopId(poop.id);

  return {
    props: {
      poop,
      user,
      baseUrl,
    },
  };
}
