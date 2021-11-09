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
import { useCallback, useEffect, useRef, useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import Bottomnav from '../Components/Bottomnav';
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

  // Load Google Maps Scripts
  const { isLoaded } = useLoadScript({
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

  // Create refs to use on map
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Create function to pan map to selected location
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  return isLoaded ? (
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
                  // panTo(lat, lng);
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
                    data.map(({ id, description }) => (
                      <ComboboxOption key={id} value={description} />
                    ))}
                </ComboboxList>
              </ComboboxPopover>
            </Combobox>

            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={center}
              options={options}
              onLoad={onMapLoad}
            />
            <button className="mt-8 mb-8 text-xl bg-gradient-to-r from-pooppink-dark to-pooppink-light rounded text-white font-bold py-3 px-28">
              Add poop
            </button>
          </div>
        </div>
      </main>
    </div>
  ) : (
    <div>
      <Header />
      <h2 className="text-3xl text-center mt-8">Loading</h2>
      <Bottomnav />
    </div>
  );
}
