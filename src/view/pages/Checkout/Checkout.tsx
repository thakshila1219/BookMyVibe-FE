
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    paymentMethod: "credit-card" | "debit-card" | "paypal" | "bank-transfer";
}

interface CheckoutProps {
    cartItems: CartItem[];
    onConfirmBooking: (details: CustomerDetails) => Promise<boolean>;
}

export function Checkout({ cartItems, onConfirmBooking }: CheckoutProps) {
    const navigate = useNavigate();

    const [customerName, setCustomerName] = useState(
        localStorage.getItem("username") || ""
    );
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [paymentMethod, setPaymentMethod] =
        useState<CustomerDetails["paymentMethod"]>("credit-card");

    const [loading, setLoading] = useState(false);

    const subtotal = cartItems.reduce(
        (total, item) => total + item.totalPrice,
        0
    );

    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            navigate("/events");
            return;
        }

        setLoading(true);

        try {
            const success = await onConfirmBooking({
                customerName,
                customerEmail,
                customerPhone,
                paymentMethod
            });

            if (success) {
                navigate("/events");
            }
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">
                    Your Cart is Empty
                </h2>

                <button
                    onClick={() => navigate("/events")}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg"
                >
                    Explore Events
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Checkout
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <form
                    onSubmit={handleSubmit}
                    className="lg:col-span-2 bg-white border rounded-xl p-6 space-y-5"
                >
                    <h2 className="text-xl font-bold">
                        Customer Details
                    </h2>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            required
                            className="w-full border rounded-lg p-3"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            required
                            className="w-full border rounded-lg p-3"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            required
                            className="w-full border rounded-lg p-3"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Payment Method
                        </label>

                        <select
                            value={paymentMethod}
                            onChange={(e) =>
                                setPaymentMethod(
                                    e.target.value as CustomerDetails["paymentMethod"]
                                )
                            }
                            className="w-full border rounded-lg p-3"
                            required
                        >
                            <option value="credit-card">Credit Card</option>
                            <option value="debit-card">Debit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="bank-transfer">Bank Transfer</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Confirm Booking"}
                    </button>

                </form>

                <div className="bg-gray-50 border rounded-xl p-6 h-fit">
                    <h2 className="text-xl font-bold mb-5">
                        Order Summary
                    </h2>

                    <div className="space-y-4 mb-5">
                        {cartItems.map((item) => (
                            <div
                                key={`${item.id}-${item.ticketType.id}`}
                                className="border-b pb-3"
                            >
                                <h3 className="font-semibold">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {item.ticketType.name} × {item.quantity}
                                </p>

                                <p className="font-medium text-blue-600">
                                    ${item.totalPrice.toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Service Fee / Tax (5%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>

                        <div className="border-t pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span className="text-blue-600">
                                ${total.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
