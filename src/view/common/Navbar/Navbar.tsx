
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, User, ShoppingCart } from 'lucide-react';

interface NavbarProps {
    cartCount?: number;
}

export function Navbar({ cartCount = 0 }: NavbarProps) {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    // Get logged-in user details
    useEffect(() => {
        const storedUserName = localStorage.getItem("username");
        const storedRole = localStorage.getItem("role");

        setUsername(storedUserName);
        setRole(storedRole);
    }, [location.pathname]);

    // Navigation items
    const userNavigationItems = [
        { name: 'Home', href: '/' },
        { name: 'Events', href: '/events' },

        ...(role === 'user'
            ? [{ name: 'My Bookings', href: '/my-bookings' }]
            : []),

        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' }
    ];

    // Search event
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        setUsername(null);
        setRole(null);

        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}

                    <div className="flex items-center">

                        <Link to="/" className="flex items-center space-x-2">

                            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">B</span>
                            </div>

                            <span className="font-bold text-xl text-gray-900">
                                BookMyVibe
                            </span>

                        </Link>

                    </div>

                    {/* Desktop Navigation */}

                    <nav className="hidden md:flex items-center space-x-8">

                        {userNavigationItems.map((item) => (

                            <Link
                                key={item.name}
                                to={item.href}
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            >
                                {item.name}
                            </Link>

                        ))}

                    </nav>

                    {/* Search Bar - Desktop */}

                    <div className="hidden lg:flex items-center space-x-4">

                        <form onSubmit={handleSearch} className="relative">

                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />

                            <input
                                type="search"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />

                        </form>

                    </div>

                    {/* User Actions & Cart */}

                    <div className="flex items-center space-x-4">

                        {/* Cart Icon */}

                        <Link
                            to="/cart"
                            className="relative cursor-pointer p-2 text-gray-700 hover:text-blue-600 transition-colors"
                            title="View Cart"
                        >

                            <ShoppingCart className="h-6 w-6" />

                            {cartCount > 0 && (

                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>

                            )}

                        </Link>

                        {/* User Account Section */}

                        <div className="flex items-center space-x-3">

                            {username ? (

                                <div className="flex items-center space-x-3">

                                    <div className="hidden sm:flex items-center space-x-2">

                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <User className="h-4 w-4 text-blue-600" />
                                        </div>

                                        <span className="text-sm font-medium text-gray-900">
                                            {username}
                                        </span>

                                    </div>

                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        Logout
                                    </button>

                                </div>

                            ) : (

                                <div className="flex items-center space-x-2">

                                    <Link
                                        to="/login"
                                        className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/register"
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        Sign Up
                                    </Link>

                                </div>

                            )}

                        </div>

                        {/* Mobile Menu Button */}

                        <button
                            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >

                            {isMenuOpen
                                ? <X className="h-5 w-5" />
                                : <Menu className="h-5 w-5" />
                            }

                        </button>

                    </div>

                </div>

                {/* Mobile Menu */}

                {isMenuOpen && (

                    <div className="md:hidden">

                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">

                            {/* Mobile Search */}

                            <form onSubmit={handleSearch} className="relative mb-4">

                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />

                                <input
                                    type="search"
                                    placeholder="Search events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />

                            </form>

                            {/* Mobile Navigation */}

                            {userNavigationItems.map((item) => (

                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>

                            ))}

                            {/* Mobile User Actions */}

                            <div className="pt-4 border-t border-gray-200 space-y-2">

                                {username ? (

                                    <div className="space-y-2">

                                        <div className="flex items-center px-3 py-2">

                                            <User className="h-4 w-4 mr-2 text-blue-600" />

                                            <span className="text-sm font-medium text-gray-900">
                                                {username}
                                            </span>

                                        </div>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-3 py-2 text-left text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                                        >
                                            Logout
                                        </button>

                                    </div>

                                ) : (

                                    <>

                                        <Link
                                            to="/login"
                                            className="w-full flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                                        >
                                            <User className="h-4 w-4 mr-2" />
                                            Login
                                        </Link>

                                        <Link
                                            to="/register"
                                            className="w-full px-3 py-2 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                        >
                                            Sign Up
                                        </Link>

                                    </>

                                )}

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </header>
    );
}
