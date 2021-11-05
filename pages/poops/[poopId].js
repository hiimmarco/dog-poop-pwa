import Head from 'next/head';
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
          <p className="text-base mb-6">
            A really bad one. I almost stumbled into it.
          </p>
          <p className="font-semibold text-pink-700 underline mb-8">
            Back to home
          </p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { getPoop } = await import('../../util/database');

  const poop = await getPoop(context.query.poopId);

  /*   const poop = poops.find((poop) => {
    return idFromUrl === poop.id;
  }); */

  return {
    props: {
      poop,
    },
  };
}
