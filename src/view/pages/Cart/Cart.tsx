import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

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
    location?: string;
}

interface CartProps {
    cartItems?: CartItem[];
    onUpdateQuantity?: (id: string, ticketTypeId: string, newQuantity: number) => void;
    onRemoveItem?: (id: string, ticketTypeId: string) => void;
    onClearCart?: () => void;
    onCheckout?: () => void;
}

export function Cart({ 
    cartItems = [], 
    onUpdateQuantity, 
    onRemoveItem, 
    onClearCart, 
    onCheckout 
}: CartProps) {
    const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    const tax = subtotal * 0.05; // 5% service fee/tax
    const total = subtotal + tax;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <div className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-blue-600">
                    <ShoppingBag className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
                <p className="text-gray-600 mb-6 text-center max-w-md">
                    Looks like you haven't added any event tickets to your cart yet. Explore our events and book your vibe!
                </p>
                <Link
                    to="/events"
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                    Explore Events
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={`${item.id}-${item.ticketType.id}`}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border border-gray-200 rounded-xl p-4 shadow-sm gap-4"
                        >
                            <div className="flex items-center space-x-4">
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                )}
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                                    <p className="text-sm text-gray-500">Ticket Type: <span className="font-medium text-gray-700">{item.ticketType.name}</span></p>
                                    <p className="text-sm text-gray-500">{item.date} | {item.location}</p>
                                    <p className="text-blue-600 font-bold mt-1">${item.price.toFixed(2)} each</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between w-full sm:w-auto space-x-4 border-t sm:border-t-0 pt-3 sm:pt-0">
                                {/* Quantity Controls */}
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.ticketType.id, item.quantity - 1)}
                                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="px-4 font-semibold text-gray-800">{item.quantity}</span>
                                    <button
                                        onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.ticketType.id, item.quantity + 1)}
                                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>

                                <span className="font-bold text-lg text-gray-900 min-w-[80px] text-right">
                                    ${item.totalPrice.toFixed(2)}
                                </span>

                                <button
                                    onClick={() => onRemoveItem && onRemoveItem(item.id, item.ticketType.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Remove item"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between pt-2">
                        <button
                            onClick={onClearCart}
                            className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
                        >
                            Clear Cart
                        </button>
                        <Link
                            to="/events"
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                            Continue Shopping →
                        </Link>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 h-fit space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Order Summary</h2>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Service Fee / Tax (5%)</span>
                            <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="border-t pt-4 flex justify-between font-bold text-lg text-gray-900">
                        <span>Total</span>
                        <span className="text-blue-600">${total.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={onCheckout}
                        className="w-full mt-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 shadow-sm"
                    >
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}