import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Title Section */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
        ISI Travel Management <br /> System
      </h1>

      {/* Call-to-Action Button */}
      <div className="mt-4">
        <Link href="/login">
          <button className="bg-yellow-600 hover:bg-yellow-700 text-black font-semibold py-3 px-8 rounded-lg shadow-lg">
            Get Started
          </button>
        </Link>
        <p className="text-gray-400 mt-2 text-sm">
          Manage your travel requests efficiently
        </p>
      </div>

      {/* Placeholder for Visual Elements */}
      <div className="mt-12 flex flex-wrap justify-center gap-8">
        <div className="w-32 h-32 bg-yellow-100 rounded-md"></div>
        <div className="w-32 h-32 bg-purple-100 rounded-md"></div>
        <div className="w-32 h-32 bg-yellow-100 rounded-md"></div>
      </div>
    </div>
  );
};

export default HomePage; 