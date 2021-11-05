import Layout from '../Components/Layout';
import Poopcard from '../Components/Poopcard';

export default function Start(props) {
  return (
    <div>
      <Layout />
      <div className="flex flex-col h-screen ">
        <div className="mt-8 pl-4 pr-4 overflow-y-auto">
          <p className="mb-8 text-2xl font-medium">Recently added</p>
          <div>
            {props.poops.map((poop) => {
              return (
                <div key={`id-list-${poop.id}`}>
                  <Poopcard
                    title={poop.title}
                    author={poop.author}
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

/* export async function getServerSideProps(context) {
  const { poops } = await import('../util/database');

  return {
    props: {
      poops: poops,
    },
  };
} */

export async function getServerSideProps(context) {
  const { getPoops } = await import('../util/database');

  const poops = await getPoops();

  return {
    props: {
      poops,
    },
  };
}
