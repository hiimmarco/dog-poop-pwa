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
import { useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import Bottomnav from '../Components/Bottomnav';
import Header from '../Components/Header';

const libraries = ['places'];

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
  zoomControl: true,
};

export default function Addpoop() {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');

  // Load Google Maps Scripts
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAgZpzR1cuZ1Pe77I8gsJJvKKboJsx_KYk',
    libraries,
  });

  function newTitle() {
    return 'Hello';
  }

  function newAddress() {
    return 'Hello';
  }

  return isLoaded ? (
    <div>
      <Header />
      <main>
        <div className="flex flex-col h-screen">
          <div className="mt-8 pl-4 pr-4">
            <p className="mb-8 text-2xl font-medium">Add poop</p>
            <label
              className="block text-base font-semibold mb-2"
              for="username"
            >
              Title:
              <input
                className="mb-8 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={title}
                onChange={newTitle}
              />
            </label>
            <label
              className="block text-base font-semibold mb-4"
              for="username"
            >
              Address:
              <input
                className="mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={address}
                onChange={newAddress}
              />
            </label>

            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={center}
              options={options}
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
