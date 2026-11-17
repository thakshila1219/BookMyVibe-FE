
import { jwtDecode } from 'jwt-decode';
import { backendApi } from '../../../api';
import { Navbar } from "../Navbar/Navbar.tsx";
import { MainContent } from "../MainContent/MainContent.tsx";
import { Footer } from "../Footer/Footer.tsx";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface TicketType {
    id: string;
    name: string;
    price: number;
    description: string;
}

interface CartItem {
    id: string;
    title: string;
    price: number;
    ticketType: TicketType;
    quantity: number;
    totalPrice: number;
    image?: string;
    date?: string;
    time?: string;
    location?: string;
}

interface CustomerDetails {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    paymentMethod: 'credit-card' | 'debit-card' | 'paypal' | 'bank-transfer';
}

interface TokenData {
    userId: string;
    username: string;
    email: string;
    role: string;
}

export function DefaultLayout() {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const [role, setRole] = useState<string | null>(
        localStorage.getItem("role")
    );

    const location = useLocation();

    useEffect(() => {
        setRole(localStorage.getItem("role"));
    }, [location.pathname]);

    const isAdmin = role === "admin";

    const handleAddToCart = (cartItem: CartItem) => {

        setCartItems(prevItems => {

            const existingIndex = prevItems.findIndex(
                item =>
                    item.id === cartItem.id &&
                    item.ticketType.id === cartItem.ticketType.id
            );

            if (existingIndex > -1) {

                const updated = [...prevItems];

                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity:
                        updated[existingIndex].quantity + cartItem.quantity,
                    totalPrice:
                        (updated[existingIndex].quantity + cartItem.quantity) *
                        updated[existingIndex].price
                };

                return updated;
            }

            return [...prevItems, cartItem];
        });

        alert(`Successfully added "${cartItem.title}" to your cart!`);
    };

    const handleUpdateQuantity = (
        id: string,
        ticketTypeId: string,
        newQuantity: number
    ) => {

        if (newQuantity <= 0) {
            handleRemoveItem(id, ticketTypeId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item => {

                if (
                    item.id === id &&
                    item.ticketType.id === ticketTypeId
                ) {
                    return {
                        ...item,
                        quantity: newQuantity,
                        totalPrice: newQuantity * item.price
                    };
                }

                return item;
            })
        );
    };

    const handleRemoveItem = (
        id: string,
        ticketTypeId: string
    ) => {

        setCartItems(prevItems =>
            prevItems.filter(
                item =>
                    !(item.id === id && item.ticketType.id === ticketTypeId)
            )
        );
    };

    const handleClearCart = () => {
        setCartItems([]);
    };

    // Confirm booking and save each event separately
    const handleConfirmBooking = async (
        customer: CustomerDetails
    ): Promise<boolean> => {

        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return false;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login before booking.");
            return false;
        }

        try {

            const user = jwtDecode<TokenData>(token);

            if (!user.userId || !user.email) {
                alert(
                    "Your login session is invalid. Please logout and login again."
                );
                return false;
            }

            // Validate event information before sending requests
            for (const item of cartItems) {

                if (
                    !item.id ||
                    !item.date ||
                    !item.time ||
                    !item.location
                ) {
                    alert(
                        `Event details are missing for "${item.title}". Please select the event again.`
                    );
                    return false;
                }
            }

            // Create one booking for each cart event
            for (const item of cartItems) {

                // Console Log 03
                console.log("Cart Item:", item);
                console.log("Booking Event ID:", item.id);

                const bookingData = {
                    eventId: item.id,
                    userId: user.userId,
                    customerName: customer.customerName,
                    customerEmail: customer.customerEmail,
                    customerPhone: customer.customerPhone,
                    numberOfTickets: item.quantity,
                    totalPrice: Number(
                        (item.totalPrice * 1.05).toFixed(2)
                    ),
                    eventDate: item.date!,
                    eventTime: item.time!,
                    eventTitle: item.title,
                    eventLocation: item.location!,
                    paymentMethod: customer.paymentMethod
                };

                console.log("Booking Data Sent to Backend:", bookingData);

                await backendApi.post("/booking", bookingData);
            }

            alert("All bookings confirmed successfully! 🎉");

            setCartItems([]);

            return true;

        } catch (error: any) {

            console.error("Checkout error:", error);

            const message =
                error.response?.data?.error ||
                error.response?.data?.message ||
                error.message ||
                "Please try again.";

            alert("Booking failed: " + message);

            return false;
        }
    };

    return (
        <>
            {!isAdmin && (
                <Navbar
                    cartCount={cartItems.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                    )}
                />
            )}

            <MainContent
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                onConfirmBooking={handleConfirmBooking}
            />

            {!isAdmin && <Footer />}
        </>
    );
}
