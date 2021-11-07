import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import Bottomnav from '../Components/Bottomnav';
import Header from '../Components/Header';

const libraries = ['places'];

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 48.208647306552386,
  lng: 16.37347071007108,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Maptest(props) {
  // Load Google Maps Scripts
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAgZpzR1cuZ1Pe77I8gsJJvKKboJsx_KYk',
    libraries,
  });

  return isLoaded ? (
    <div>
      <Header />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
      >
        {props.poops.map((poop) => (
          <Marker
            key={`id-list-${poop.id}`}
            position={{
              lat: Number(poop.latitude),
              lng: Number(poop.longitude),
            }}
            icon={{
              url: '/favicon.png',
              scaledSize: new window.google.maps.Size(32, 32),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
        ))}
      </GoogleMap>
      <Bottomnav />
    </div>
  ) : (
    <div>
      <Header />
      <h2 className="text-3xl text-center mt-8">Loading</h2>
      <Bottomnav />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { getPoops } = await import('../util/database');

  const poops = await getPoops();

  return {
    props: {
      poops,
    },
  };
}
