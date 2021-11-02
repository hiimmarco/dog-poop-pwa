import Layout from '../Components/Layout';
import Poopcard from '../Components/Poopcard';

export default function Account() {
  return (
    <div>
      <Layout />
      <div className="flex flex-col h-screen">
        <div className="mt-8 pl-4 pr-4">
          <p className="mb-8 text-2xl font-medium">Account</p>

          <p className="mb-8 text-2xl font-medium">
            Username: <span>Max Moser</span>
          </p>
          <p className="mb-8 text-2xl font-medium">My added poop:</p>
          <Poopcard />
          <Poopcard />
          <Poopcard />
          <Poopcard />
        </div>
      </div>
    </div>
  );
}
