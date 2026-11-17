
import { useEffect, useState } from "react";
import { backendApi } from "../../../api";

interface Booking {
    _id: string;
    eventTitle: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    numberOfTickets: number;
    totalPrice: number;
    status: string;
    paymentStatus: string;
    ticketCode: string;
    bookingDate: string;
}

export const MyBookings = () => {

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {

        const fetchMyBookings = async () => {

            try {

                const response = await backendApi.get("/booking/my-bookings");

                setBookings(response.data);

            } catch (error: any) {

                console.error("Failed to fetch bookings:", error);

                setError(
                    error.response?.data?.error ||
                    "Failed to load your bookings."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchMyBookings();

    }, []);

    // Loading state
    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <p className="text-gray-600 text-lg">
                    Loading your bookings...
                </p>

            </div>
        );

    }

    // Error state
    if (error) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <p className="text-red-600">
                    {error}
                </p>

            </div>
        );

    }

    return (

        <div className="min-h-screen bg-gray-50 py-10 px-4">

            <div className="max-w-6xl mx-auto">

                {/* Page Header */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        My Bookings
                    </h1>

                    <p className="text-gray-600 mt-2">
                        View and manage your event bookings.
                    </p>

                </div>

                {/* No Bookings */}

                {bookings.length === 0 ? (

                    <div className="bg-white rounded-xl shadow-sm p-10 text-center">

                        <h2 className="text-xl font-semibold text-gray-800">
                            No Bookings Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            You haven't booked any events yet.
                        </p>

                    </div>

                ) : (

                    /* Booking Cards */

                    <div className="space-y-6">

                        {bookings.map((booking) => (

                            <div
                                key={booking._id}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                            >

                                {/* Event Details */}

                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

                                    <div>

                                        <h2 className="text-xl font-bold text-gray-900">
                                            {booking.eventTitle}
                                        </h2>

                                        <p className="text-gray-500 mt-1">
                                            {booking.eventLocation}
                                        </p>

                                    </div>

                                    {/* Booking Status */}

                                    <div className="flex flex-wrap gap-2">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                booking.status === "confirmed"
                                                    ? "bg-green-100 text-green-700"
                                                    : booking.status === "cancelled"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {booking.status}
                                        </span>

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                booking.paymentStatus === "paid"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            Payment: {booking.paymentStatus}
                                        </span>

                                    </div>

                                </div>

                                {/* Booking Information */}

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Event Date
                                        </p>

                                        <p className="font-semibold text-gray-800 mt-1">
                                            {booking.eventDate}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Event Time
                                        </p>

                                        <p className="font-semibold text-gray-800 mt-1">
                                            {booking.eventTime}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Number of Tickets
                                        </p>

                                        <p className="font-semibold text-gray-800 mt-1">
                                            {booking.numberOfTickets}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Total Price
                                        </p>

                                        <p className="font-semibold text-gray-800 mt-1">
                                            Rs. {Number(booking.totalPrice).toLocaleString()}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Ticket Code
                                        </p>

                                        <p className="font-semibold text-blue-600 mt-1">
                                            {booking.ticketCode}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Booking Date
                                        </p>

                                        <p className="font-semibold text-gray-800 mt-1">
                                            {booking.bookingDate
                                                ? new Date(booking.bookingDate).toLocaleDateString()
                                                : "N/A"}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

};
