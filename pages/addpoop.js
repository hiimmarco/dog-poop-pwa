import '@reach/combobox/styles.css';
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import Bottomnav from '../components/Bottomnav';
import Header from '../components/Headercomp';

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

function Locate({ panTo, setLongitude, setLatitude }) {
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

// Create address bar component with autosuggestions
function Search({ setLatitude, setLongitude, panTo }) {
  const {
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
  return (
    <div>
      <Head>
        <title>Add poop - Dog Poop</title>
        <meta
          name="description"
          content="Pop Doog is the #1 dog poop reporter in the world."
        />
      </Head>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            setLatitude(lat);
            setLongitude(lng);
            panTo({ lat, lng });
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
    </div>
  );
}

export default function Addpoop(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [markers, setMarkers] = useState({});
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [currentDate, setCurrentDate] = useState('Testdate');
  const router = useRouter();
  const authorId = props.user.id;
  console.log(markers);

  // Function to get the date on which the poop was added
  useEffect(() => {
    const newDate = new Date();
    const daydate = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const wholeDate = `${daydate}.${month}.${year}`;
    setCurrentDate(wholeDate);
  }, []);

  async function createPoop(
    poopAuthorId,
    poopTitle,
    poopDescription,
    poopLatitude,
    poopLongitude,
    poopDate,
  ) {
    const poopsResponse = await fetch(`${props.baseUrl}/api/poops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        poopAuthorId,
        poopTitle,
        poopDescription,
        poopLatitude,
        poopLongitude,
        poopDate,
      }),
    });
    const poops = await poopsResponse.json();
    router.push('/');
    console.log(poops);
  }

  // Load Google Maps Scripts
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: props.mapApiKey,
    libraries,
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
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  if (!isLoaded) return 'Loading';
  if (loadError) return 'Load error';

  return (
    <div>
      <Header />
      <main>
        <div className="flex flex-col h-screen max-w-xl mx-auto mb-10">
          <div className="mt-8 pl-4 pr-4">
            <p className="mb-10 text-2xl font-semibold text-gray-800">
              Add poop
            </p>
            <label className="block text-base font-semibold text-gray-800 mb-2">
              Title:
              <input
                className="mb-6 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                value={title}
                onChange={(event) => {
                  setTitle(event.currentTarget.value);
                }}
              />
            </label>
            <label className="block text-base font-semibold text-gray-800 mb-2">
              Description:
              <input
                required
                className="mb-6 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={description}
                onChange={(event) => {
                  setDescription(event.currentTarget.value);
                }}
              />
            </label>

            <p className="text-base font-semibold text-gray-800">Address:</p>
            <Search
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              panTo={panTo}
            />
            <Locate
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              panTo={panTo}
            />
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
            <div className="flex justify-center">
              <button
                className="w-full max-w-xl mt-8 mb-24 mx-auto text-xl bg-gradient-to-r from-pooppink-dark to-pooppink-light rounded text-white font-bold py-3 px-28"
                onClick={() =>
                  createPoop(
                    authorId,
                    title,
                    description,
                    latitude,
                    longitude,
                    currentDate,
                  )
                }
              >
                Add poop
              </button>
            </div>
          </div>
        </div>
        <Bottomnav />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const mapApiKey = process.env.GOOGLE_API;
  const { getValidSessionByToken } = await import('../util/database');

  const sessionToken = context.req.cookies.sessionToken;

  const session = await getValidSessionByToken(sessionToken);

  if (!session) {
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
      redirect: {
        destination: '/signup?returnTo=/account',
        permanent: false,
      },
    };
  }
  const { getUserBySessionToken } = await import('../util/database');
  const user = await getUserBySessionToken(context.req.cookies.sessionToken);

  const baseUrl = process.env.BASE_URL;

  return {
    props: {
      baseUrl,
      user,
      mapApiKey,
    },
  };
}
