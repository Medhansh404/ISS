import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="relative items-center max-h-screen max-v-screen">
            {/* Sidebar */}
            <nav className="w-64 bg-gray-800 text-white flex flex-col justify-start py-6 fixed left-0 top-0 h-full">
                {/* Logo placeholder */}
                <div className="mb-8 flex justify-center">
                    {/* Replace this div with your logo */}
                    <div className="w-24 h-24 bg-white rounded-full"></div>
                </div>

                {/* Links */}
                <ul className="space-y-4 w-full px-4">
                    <li>
                        <Link to="/" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-center">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-center">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-center">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-center">
                            Login
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Main Content */}
            <div className=" bg-gray-100">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
