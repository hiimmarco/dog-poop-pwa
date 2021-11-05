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
  lat: 48.19355,
  lng: 16.40865,
};

export default function Maptest() {
  // Load Google Maps Scripts
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.local.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return 'Error loading map';
  if (!isLoaded) return 'Loading maps';
  return (
    <div>
      <Header />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
      />
      <Bottomnav />
    </div>
  );
}
