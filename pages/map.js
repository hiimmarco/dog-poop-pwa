import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import { useCallback, useRef, useState } from 'react';
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

function Locate({ panTo, setLatitude, setLongitude }) {
  return (
    <button
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          () => null,
        );
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 mb-8"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

export default function Maptest(props) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  // Load Google Maps Scripts
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAgZpzR1cuZ1Pe77I8gsJJvKKboJsx_KYk',
    libraries,
  });
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Create refs to use on map
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Create function to pan map to selected location
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);
  return isLoaded ? (
    <div>
      <Header />
      <Locate
        panTo={panTo}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {props.poops.map((poop) => (
          <Marker
            key={`id-list-${poop.id}`}
            position={{
              lat: Number(poop.latitude),
              lng: Number(poop.longitude),
            }}
            icon={{
              url: '/mappoop.png',
              scaledSize: new window.google.maps.Size(32, 27),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelectedMarker(poop);
            }}
          />
        ))}
        <Marker position={{ lat: Number(latitude), lng: Number(longitude) }} />
        {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
        {selectedMarker ? (
          <InfoWindow
            position={{
              lat: Number(selectedMarker.latitude),
              lng: Number(selectedMarker.longitude),
            }}
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
          >
            <div>
              <h2>{selectedMarker.title}</h2>
              <p>{selectedMarker.author}</p>
            </div>
          </InfoWindow>
        ) : null}
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

  const { getValidSessionByToken } = await import('../util/database');

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
      poops,
    },
  };
}
