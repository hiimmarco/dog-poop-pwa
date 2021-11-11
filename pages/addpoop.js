import '@reach/combobox/styles.css';
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
  ComboboxPopover,
} from '@reach/combobox';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import Head from 'next/head';
import { useCallback, useRef, useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import Header from '../Components/Header';

const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: 48.208647306552386,
  lng: 16.37347071007108,
};

const options = {
  disableDefaultUI: true,
  // zoomControl: true,
};

const libraries = ['places'];

export default function Addpoop() {
  const [title, setTitle] = useState('');
  const [markers, setMarkers] = useState({});
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // Load Google Maps Scripts
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAgZpzR1cuZ1Pe77I8gsJJvKKboJsx_KYk',
    libraries,
  });

  // Load google places autocomplete
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 48.208647306552386, lng: () => 16.37347071007108 },
      radius: 40 * 1000,
    },
  });

  const onMapClick = useCallback((event) => {
    setMarkers({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    setLatitude(event.latLng.lat());
    setLongitude(event.latLng.lng());
  }, []);

  // Create refs to use on map
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Create function to pan map to selected location
  /*   const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []); */

  if (!isLoaded) return 'Loading';
  if (loadError) return 'Load error';

  return (
    <div>
      <Header />
      <main>
        <div className="flex flex-col h-screen">
          <div className="mt-8 pl-4 pr-4">
            <p className="mb-8 text-2xl font-medium">Add poop</p>
            <label className="block text-base font-semibold mb-2">
              Title:
              <input
                className="mb-6 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={title}
                onChange={(event) => {
                  setTitle(event.currentTarget.value);
                }}
              />
            </label>
            <p className="font-semibold">Address:</p>

            <Combobox
              onSelect={async (address) => {
                setValue(address, false);
                clearSuggestions();
                try {
                  const results = await getGeocode({ address });
                  const { lat, lng } = await getLatLng(results[0]);
                  console.log(lat, lng);
                  setLatitude(lat);
                  setLongitude(lng);
                } catch (error) {
                  console.log('Error');
                }
              }}
            >
              <ComboboxInput
                className="mb-8 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                // placeholder="Enter address"
              />
              <ComboboxPopover>
                <ComboboxList>
                  {status === 'OK' &&
                    data.map(({ place_id, description }) => (
                      <ComboboxOption key={place_id} value={description} />
                    ))}
                </ComboboxList>
              </ComboboxPopover>
            </Combobox>

            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={center}
              options={options}
              onClick={onMapClick}
              onLoad={onMapLoad}
            >
              <Marker
                position={{ lat: Number(latitude), lng: Number(longitude) }}
                icon={{
                  url: '/mappoop.png',
                  scaledSize: new window.google.maps.Size(32, 27),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                }}
              />
            </GoogleMap>
            <button
              className="mt-8 mb-8 text-xl bg-gradient-to-r from-pooppink-dark to-pooppink-light rounded text-white font-bold py-3 px-28"
              onClick={() => console.log(latitude, longitude)}
            >
              Add poop
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

/* (
  <div>
    <Header />
    <h2 className="text-3xl text-center mt-8">Loading</h2>
    <Bottomnav />
  </div>
) :  */
