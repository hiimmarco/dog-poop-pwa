import Image from 'next/image';
import Bottomnav from '../Components/Bottomnav';
import Header from '../Components/Header';
import Layout from '../Components/Layout';

export default function Map() {
  return (
    <div>
      <Header />
      <main>
        <img
          src="/images/map.png"
          alt="Map"
          width="375"
          height="537"
          className="pt-20"
        />
      </main>
      <Bottomnav />
    </div>
  );
}
