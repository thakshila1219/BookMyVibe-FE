import {EventCard} from "../EventCard/EventCard.tsx";

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

interface EventListingProps {
    events?: Event[];
    title?: string;
    onBookNow?: (event: Event) => void;
}

interface TicketType {
    id: string;
    name: string;
    price: number;
    description: string;
}

const sampleEvents: Event[] = [
    {
        id: '1',
        title: 'Jazz in the Park',
        date: 'Jul 30, 2024',
        time: '7:00 PM',
        location: 'Washington Square Park',
        price: 25,
        attendees: 800,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
        category: 'Music',
        description: 'Smooth jazz under the stars in one of NYC\'s most iconic parks.',
        rating: 4.7,
        reviews: 124,
        organizer: 'Jazz Events NYC',
        status: 'available'
    },
    {
        id: '2',
        title: 'Art Gallery Opening',
        date: 'Aug 5, 2024',
        time: '6:00 PM',
        location: 'MoMA, New York',
        price: 35,
        attendees: 300,
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
        category: 'Art',
        description: 'Exclusive opening featuring contemporary art exhibition featuring emerging artists from around the world.',
        rating: 4.9,
        reviews: 87,
        organizer: 'Modern Art Collective',
        status: 'available'
    },
    {
        id: '3',
        title: 'Marathon 2024',
        date: 'Sep 1, 2024',
        time: '7:00 AM',
        location: 'Central Park Start Line',
        price: 150,
        attendees: 15000,
        image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop',
        category: 'Sports',
        description: 'Join thousands of runners in the annual NYC Marathon through all five boroughs of the city.',
        rating: 4.8,
        reviews: 892,
        organizer: 'NYC Marathon Organization',
        status: 'available'
    }
];

export const EventListing = ({
                                 events = sampleEvents,
                                 title = "Discover Amazing Events",
                                 onBookNow
                             }: EventListingProps) => {
    const handleBookNow = (event: Event) => {
        if (onBookNow) {
            onBookNow(event);
        } else {
            alert(`Booking ${event.title} for $${event.price}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {title}
                    </h1>
                    <p className="text-gray-600">
                        {events.length} events available
                    </p>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onBookNow={handleBookNow}
                        />
                    ))}
                </div>

                {/* No Events Message */}
                {events.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500">
                            <h3 className="text-lg font-semibold mb-2 text-gray-700">No events found</h3>
                            <p>Check back later for upcoming events</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}