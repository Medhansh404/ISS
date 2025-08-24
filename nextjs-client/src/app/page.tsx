import Navbar from '@/components/Navbar';
import HomePage from '@/components/Home';

export default function Home() {
  return (
    <div className="app bg-gray-800">
      <Navbar />
      <div className="pt-16">
        <HomePage />
      </div>
    </div>
  );
}
