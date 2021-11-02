import Head from 'next/head';
import { useState } from 'react';
import Header from '../Components/Header';

export default function Addpoop() {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');

  function newTitle() {
    return 'Hello';
  }

  function newAddress() {
    return 'Hello';
  }

  return (
    <div>
      <Header />
      <main>
        <div className="flex flex-col h-screen">
          <div className="mt-8 pl-4 pr-4">
            <p className="mb-8 text-2xl font-medium">Add poop</p>

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

            <button className="mb-8 text-xl bg-gradient-to-r from-pooppink-dark to-pooppink-light rounded text-white font-bold py-3 px-28">
              Add poop
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
