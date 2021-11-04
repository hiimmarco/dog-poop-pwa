import Head from 'next/head';
import Header from '../../Components/Header';
import { getPoop } from '../../util/database';

export default function Poopdetail(props) {
  return (
    <div>
      <Header />
      <h1>{props.poop.title}</h1>
      <p>{props.poop.date}</p>
      <p>{props.poop.author}</p>
      <p>Back to home</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { getPoop } = await import('../../util/database');

  const poop = await getPoop(context.query.poop);

  /*   const poop = poops.find((poop) => {
    return idFromUrl === poop.id;
  }); */

  return {
    props: {
      poop,
    },
  };
}
