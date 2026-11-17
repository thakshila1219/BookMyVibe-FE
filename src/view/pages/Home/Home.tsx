
import { useState, useEffect } from "react";
import { backendApi } from "../../../api";
import { EventDetailPage } from "../../component/EventDetailPage.tsx";
import { HeroSection } from "../../component/HeroSection/HeroSection.tsx";
import { EventListing } from "../../component/EventListing/EventListing.tsx";

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

interface HomeProps {
    onAddToCart?: (cartItem: CartItem) => void;
}

export const Home = ({ onAddToCart }: HomeProps) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentView, setCurrentView] = useState<'home' | 'detail'>('home');
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await backendApi.get("/event/all");

                const formattedEvents: Event[] = response.data.map((event: any) => ({
                    ...event,
                    id: event._id
                }));

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

    const handleBackToHome = () => {
        setCurrentView('home');
        setSelectedEvent(null);
    };

    const handleAddToCartProxy = (cartItem: CartItem) => {
        if (onAddToCart) {
            onAddToCart(cartItem);
        } else {
            alert(`Added ${cartItem.quantity} ticket(s) for "${cartItem.title}" to cart!\nTicket Type: ${cartItem.ticketType.name}\nTotal: $${cartItem.totalPrice.toFixed(2)}`);
        }
    };

    if (loading) {
        return <p>Loading events...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {currentView === 'home' ? (
                <div>
                    <HeroSection />
                    <EventListing
                        events={events}
                        onBookNow={handleBookNow}
                    />
                </div>
            ) : (
                <EventDetailPage
                    event={selectedEvent}
                    onAddToCart={handleAddToCartProxy}
                    onBack={handleBackToHome}
                />
            )}
        </div>
    );
};
