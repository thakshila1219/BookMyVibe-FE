import React, { useState } from 'react';
import { Search, Ticket } from 'lucide-react';

export function HeroSection(){
    const [searchQuery, setSearchQuery] = useState<string>('')

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Hero search:', searchQuery)
        // Handle search functionality here
    }

    return (
        <section className="w-full h-screen relative bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 text-white overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 transform rotate-12">
                    <Ticket className="h-24 w-24" />
                </div>
                <div className="absolute top-32 right-32 transform -rotate-12">
                    <Ticket className="h-16 w-16" />
                </div>
                <div className="absolute bottom-20 left-20 transform rotate-45">
                    <Ticket className="h-20 w-20" />
                </div>
                <div className="absolute bottom-40 left-40 transform -rotate-45">
                    <Ticket className="h-12 w-12" />
                </div>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                        Let's Book Your{' '}
                        <span className="text-orange-400">Vibe</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Discover your favorite entertainment right here. From concerts to sports,
                        theater to festivals - find and book tickets for unforgettable experiences.
                    </p>

                    {/* Search bar */}
                    <div className="max-w-2xl mx-auto mb-8">
                        <form onSubmit={handleSearch} className="relative">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="search"
                                    placeholder="Search by Artist, Event or Venue"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-24 py-4 text-lg bg-white text-gray-900 border-0 shadow-lg rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors duration-200"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Call to action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full transition-colors duration-200 min-w-[160px]">
                            Explore Events
                        </button>
                        <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold rounded-full transition-colors duration-200 min-w-[160px]">
                            How It Works
                        </button>
                    </div>

                    {/* Stats section */}
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-orange-400">1000+</div>
                            <div className="text-white/80">Events Available</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-orange-400">50K+</div>
                            <div className="text-white/80">Happy Customers</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-orange-400">24/7</div>
                            <div className="text-white/80">Customer Support</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom wave decoration */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    className="w-full h-12 text-white fill-current"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    />
                </svg>
            </div>
        </section>
    )
}
