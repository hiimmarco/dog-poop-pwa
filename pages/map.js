import Bottomnav from '../Components/Bottomnav';
import Header from '../Components/Header';

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
          className=""
        />
      </main>
      <Bottomnav />
    </div>
  );
}
