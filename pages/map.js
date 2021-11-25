import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import Bottomnav from '../components/Bottomnav';
import Header from '../components/Headercomp';

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
    googleMapsApiKey: props.mapApiKey,
    libraries,
  });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const homeColor = 'text-gray-400';
  const mapColor = 'text-gray-700';

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
    <div className="fixed">
      <Header />
      {/* <Locate
        panTo={panTo}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        className="fixed mx-auto bottom-0 inset-x-0"
      /> */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        <Locate
          panTo={panTo}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
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
              <Link href={`/poops/${selectedMarker.id}`}>
                <a>
                  <h2 className="text-lg font-semibold text-gray-800 p-2">
                    {selectedMarker.title}
                  </h2>
                </a>
              </Link>
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
  const mapApiKey = process.env.GOOGLE_API;
  const { getPoops } = await import('../util/database');

  const poops = await getPoops();

  return {
    props: {
      poops,
      mapApiKey,
    },
  };
}
