import {
    Calendar,
    MapPin,
    Users,
} from 'lucide-react'

interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    price: number;
    attendees: number;
    image: string;
    category: string;
    description?: string;
    rating?: number;
    reviews?: number;
    organizer?: string;
    status?: 'available' | 'sold-out' | 'coming-soon';
}

interface EventCardProps {
    event: Event;
    onBookNow?: (event: Event) => void;
}

export const EventCard = ({ event, onBookNow }: EventCardProps) => {
    const handleBookNow = () => {
        if (onBookNow) {
            onBookNow(event)
        }
    }

    const formatDate = (dateStr: string) => {
        // Handle both "Jul 30, 2024" and "2025-08-15" formats
        const date = new Date(dateStr)
        if (isNaN(date.getTime())) {
            return dateStr // Return original string if parsing fails
        }
        return date.toLocaleDateString()
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border">
            {/* Event Image */}
            <div className="relative">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                />
                {/* Category Badge */}
                <span className="absolute top-3 left-3 bg-gray-800 text-white px-2 py-1 rounded text-sm font-medium">
                    {event.category}
                </span>
            </div>

            {/* Event Content */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-600 mb-3 hover:text-blue-700 cursor-pointer">
                    {event.title}
                </h3>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{formatDate(event.date)} • {event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{event.attendees.toLocaleString()} attending</span>
                    </div>
                </div>

                {/* Event Description */}
                {event.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {event.description}
                    </p>
                )}

                {/* Price and Book Button */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-xl font-bold text-blue-600">
                            ${event.price}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">per ticket</span>
                    </div>
                    <button
                        onClick={handleBookNow}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    )
}