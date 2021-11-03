import Head from 'next/head';
import Header from '../../Components/Header';

export default function Poopdetail(props) {
  return (
    <div>
      <Header />
      <h1>{props.singlePoop.title}</h1>
      <p>{props.singlePoop.date}</p>
      <p>{props.singlePoop.author}</p>
      <p>Back to home</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { poops } = await import('../../util/database');

  const idFromUrl = context.query.poop;

  const singlePoop = poops.find((poop) => {
    return idFromUrl === poop.id;
  });

  return {
    props: {
      singlePoop,
    },
  };
}
