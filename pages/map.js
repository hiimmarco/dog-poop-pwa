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

export default function Maptest(props) {
  // Load Google Maps Scripts
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAgZpzR1cuZ1Pe77I8gsJJvKKboJsx_KYk',
    libraries,
  });
  const [selectedMarker, setSelectedMarker] = useState(null);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  return isLoaded ? (
    <div>
      <Header />
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

  return {
    props: {
      poops,
    },
  };
}
