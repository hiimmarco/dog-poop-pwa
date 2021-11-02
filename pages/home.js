import Layout from '../Components/Layout';
import Poopcard from '../Components/Poopcard';

export default function Start() {
  return (
    <div>
      <Layout />
      <div className="flex flex-col h-screen">
        <div className="mt-8 pl-4 pr-4">
          <p className="mb-8 text-3xl font-medium">Recently added</p>
          <Poopcard />
        </div>
      </div>
    </div>
  );
}
