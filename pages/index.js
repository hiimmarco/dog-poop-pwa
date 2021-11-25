import Head from 'next/head';
import Bottomnav from '../components/Bottomnav';
import Header from '../components/Headercomp';
import Poopcard from '../components/Poopcard';

export default function Start(props) {
  return (
    <div>
      <Head>
        <title>Dog Poop</title>
        <meta
          name="description"
          content="Pop Doog is the #1 dog poop reporter in the world."
        />
      </Head>
      <Header />
      <div className="bg-white min-h-screen gap-4 flex flex-wrap justify-center items-center max-w-4xl mx-auto mb-12 ">
        <div className="mt-10 pl-2 pr-2 overflow-y-auto">
          <p className="mb-8 text-2xl font-semibold pl-2 text-gray-800">
            Recently added
          </p>
          <div>
            {props.poops.map((poop) => {
              return (
                <div key={`id-list-${poop.id}`}>
                  <Poopcard
                    title={poop.title}
                    date={poop.date}
                    link={poop.id}
                    description={poop.description}
                    latitude={poop.latitude}
                    longitude={poop.longitude}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Bottomnav />
    </div>
  );
}

export async function getServerSideProps() {
  const baseUrl = process.env.BASE_URL;
  const mapApiKey = process.env.GOOGLE_API;
  const poopsResponse = await fetch(`${baseUrl}/api/poops`);
  const poops = await poopsResponse.json();

  return {
    props: {
      poops,
      mapApiKey,
    },
  };
}
