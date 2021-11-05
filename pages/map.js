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

const options = {
  disableDefaultUI: true,
};

export default function Maptest() {
  // Load Google Maps Scripts
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return isLoaded ? (
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
  ) : (
    <div>
      <Header />
      <h2 className="text-3xl text-center mt-8">Loading</h2>
      <Bottomnav />
    </div>
  );
}
