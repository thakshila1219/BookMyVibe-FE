
import React from 'react';

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

interface EventDetailPageProps {
    event: Event | null;
    onAddToCart: (cartItem: CartItem) => void;
    onBack: () => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
    event,
    onAddToCart,
    onBack
}) => {

    if (!event) {
        return <div>No event selected.</div>;
    }

    const handleBuyClick = () => {

        // Console Log 02
        console.log("Selected Event:", event);
        console.log("Selected Event ID:", event.id);

        if (!event.id) {
            alert("Invalid event ID. Please try again.");
            return;
        }

        if (event.status === 'sold-out') {
            alert("Sorry! This event is sold out.");
            return;
        }

        if (event.status === 'coming-soon') {
            alert("This event is coming soon. Booking is not available yet.");
            return;
        }

        const cartItem: CartItem = {
            ...event,

            ticketType: {
                id: 't1',
                name: 'Standard',
                price: event.price,
                description: 'Standard Entry'
            },

            quantity: 1,

            totalPrice: event.price
        };

        onAddToCart(cartItem);
    };

    return (
        <div
            style={{
                padding: '30px',
                fontFamily: 'sans-serif',
                maxWidth: '800px',
                margin: '0 auto'
            }}
        >

            <button
                onClick={onBack}
                style={{
                    marginBottom: '20px',
                    padding: '8px 15px',
                    cursor: 'pointer'
                }}
            >
                &larr; Back to Listings
            </button>

            <h1>{event.title}</h1>

            {event.image && (
                <img
                    src={event.image}
                    alt={event.title}
                    style={{
                        width: '100%',
                        maxHeight: '400px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginBottom: '20px'
                    }}
                />
            )}

            <p>
                <strong>Date:</strong> {event.date} at {event.time}
            </p>

            <p>
                <strong>Location:</strong> {event.location}
            </p>

            <p>
                <strong>Price:</strong> ${event.price.toFixed(2)}
            </p>

            <p style={{ margin: '20px 0', lineHeight: '1.6' }}>
                {event.description}
            </p>

            <button
                onClick={handleBuyClick}
                disabled={event.status === 'sold-out' || event.status === 'coming-soon'}
                style={{
                    padding: '12px 25px',
                    backgroundColor:
                        event.status === 'sold-out' || event.status === 'coming-soon'
                            ? '#9ca3af'
                            : '#2563eb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor:
                        event.status === 'sold-out' || event.status === 'coming-soon'
                            ? 'not-allowed'
                            : 'pointer',
                    fontSize: '16px'
                }}
            >
                {event.status === 'sold-out'
                    ? 'Sold Out'
                    : event.status === 'coming-soon'
                        ? 'Coming Soon'
                        : 'Book Now / Add to Cart'}
            </button>

        </div>
    );
};
