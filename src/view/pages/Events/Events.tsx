
import { useEffect, useState } from 'react';
import { backendApi } from "../../../api";
import { EventListing } from "../../component/EventListing/EventListing.tsx";
import { EventDetailPage } from "../../component/EventDetailPage.tsx";

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

interface TicketType {
    id: string;
    name: string;
    price: number;
    description: string;
}

interface CartItem extends Event {
    ticketType: TicketType;
    quantity: number;
    totalPrice: number;
}

interface EventsProps {
    onAddToCart?: (cartItem: CartItem) => void;
}

export const Events = ({ onAddToCart }: EventsProps) => {

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentView, setCurrentView] = useState<'listing' | 'detail'>('listing');
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    // Fetch events from MongoDB through Backend API
    useEffect(() => {

        const fetchEvents = async () => {
            try {
                const response = await backendApi.get("/event/all");

                // Console Log 01
                console.log("Events API Response:", response.data);

                const formattedEvents: Event[] = response.data.map((event: any) => ({
                    ...event,
                    id: event._id
                }));

                console.log("Formatted Events:", formattedEvents);

                setEvents(formattedEvents);

            } catch (error) {
                console.error("Failed to fetch events:", error);
                setError("Failed to load events. Please try again.");

            } finally {
                setLoading(false);
            }
        };

        fetchEvents();

    }, []);

    const handleBookNow = (event: Event) => {
        setSelectedEvent(event);
        setCurrentView('detail');
    };

    const handleBackToListing = () => {
        setCurrentView('listing');
        setSelectedEvent(null);
    };

    // Add selected event to global cart
    const handleAddToCartProxy = (cartItem: CartItem) => {
        if (onAddToCart) {
            onAddToCart(cartItem);
        } else {
            alert(
                `Added ${cartItem.quantity} ticket(s) for "${cartItem.title}" to cart!\nTicket Type: ${cartItem.ticketType.name}\nTotal: $${cartItem.totalPrice.toFixed(2)}`
            );
        }
    };

    // Loading state
    if (loading) {
        return (
            <div>
                <p>Loading events...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>
            {currentView === 'listing' ? (
                <EventListing
                    events={events}
                    title="Discover Amazing Events"
                    onBookNow={handleBookNow}
                />
            ) : (
                <EventDetailPage
                    event={selectedEvent}
                    onAddToCart={handleAddToCartProxy}
                    onBack={handleBackToListing}
                />
            )}
        </div>
    );
};
