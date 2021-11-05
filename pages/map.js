import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import Bottomnav from '../Components/Bottomnav';
import Header from '../Components/Header';
import mapstyles from '../public/mapstyles.js';

const libraries = ['places'];

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 48.19355,
  lng: 16.40865,
};

const options = {
  styles: mapstyles,
  disableDefaultUI: true,
};

export default function Maptest() {
  // Load Google Maps Scripts
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAgZpzR1cuZ1Pe77I8gsJJvKKboJsx_KYk',
    libraries,
  });

  if (loadError) return 'Error loading map';
  if (!isLoaded) return 'Error';
  return (
    <div>
      <Header />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={center}
        options={options}
      />
      <Bottomnav />
    </div>
  );
}
