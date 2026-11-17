
import { useEffect, useState } from "react";
import { backendApi } from "../../../../api";

interface BookingData {
    _id: string;
    customerName: string;
    customerEmail: string;
    numberOfTickets: number;
    totalPrice: number;
    bookingDate?: string;
    createdAt?: string;
    eventDate: string;
    eventTitle: string;
    status: string;
    paymentStatus: string;
}

export function ManageBookings() {
    const [bookings, setBookings] = useState<BookingData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBookings = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await backendApi.get("/booking/");

            setBookings(response.data);
        } catch (error: any) {
            console.error("Bookings loading error:", error);

            setError(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Unable to load bookings. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-LK", {
            style: "currency",
            currency: "LKR",
            maximumFractionDigits: 2
        }).format(Number(amount || 0));
    };

    const formatDate = (date?: string) => {
        if (!date) return "N/A";

        const parsedDate = new Date(date);

        if (isNaN(parsedDate.getTime())) {
            return date;
        }

        return parsedDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const getStatusStyle = (status?: string) => {
        const normalizedStatus = (status || "").toLowerCase();

        if (
            normalizedStatus === "confirmed" ||
            normalizedStatus === "paid"
        ) {
            return {
                background: "#dcfce7",
                color: "#166534"
            };
        }

        if (
            normalizedStatus === "cancelled" ||
            normalizedStatus === "refunded" ||
            normalizedStatus === "failed"
        ) {
            return {
                background: "#fee2e2",
                color: "#991b1b"
            };
        }

        return {
            background: "#fef3c7",
            color: "#92400e"
        };
    };

    return (
        <div>
            {/* Page Header */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "15px",
                marginBottom: "25px"
            }}>
                <div>
                    <h1 style={{
                        fontSize: "28px",
                        color: "#171827",
                        marginBottom: "8px"
                    }}>
                        Manage Bookings
                    </h1>

                    <p style={{
                        color: "#6b7280",
                        margin: 0
                    }}>
                        View and manage all customer bookings.
                    </p>
                </div>

                <button
                    onClick={fetchBookings}
                    disabled={loading}
                    style={{
                        padding: "11px 18px",
                        background: "#5145cd",
                        color: "white",
                        border: "none",
                        borderRadius: "7px",
                        cursor: loading ? "not-allowed" : "pointer"
                    }}
                >
                    {loading ? "Loading..." : "↻ Refresh"}
                </button>
            </div>

            {/* Booking Summary */}
            {!loading && !error && (
                <div style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}>
                    <p style={{
                        color: "#6b7280",
                        margin: "0 0 8px"
                    }}>
                        Total Bookings
                    </p>

                    <h2 style={{
                        color: "#5145cd",
                        fontSize: "28px",
                        margin: 0
                    }}>
                        {bookings.length}
                    </h2>
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div style={{
                    background: "white",
                    padding: "30px",
                    textAlign: "center",
                    borderRadius: "10px",
                    color: "#6b7280"
                }}>
                    Loading bookings...
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div style={{
                    background: "#fee2e2",
                    color: "#991b1b",
                    padding: "18px",
                    borderRadius: "8px"
                }}>
                    {error}
                </div>
            )}

            {/* Bookings Table */}
            {!loading && !error && (
                <div style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}>
                    <h2 style={{
                        fontSize: "20px",
                        color: "#171827",
                        marginTop: 0,
                        marginBottom: "20px"
                    }}>
                        All Customer Bookings
                    </h2>

                    <div style={{ overflowX: "auto" }}>
                        <table style={{
                            width: "100%",
                            minWidth: "1050px",
                            borderCollapse: "collapse"
                        }}>
                            <thead>
                                <tr style={{
                                    background: "#f5f6fa",
                                    textAlign: "left"
                                }}>
                                    <th style={tableHeaderStyle}>Booking ID</th>
                                    <th style={tableHeaderStyle}>Customer</th>
                                    <th style={tableHeaderStyle}>Event</th>
                                    <th style={tableHeaderStyle}>Event Date</th>
                                    <th style={tableHeaderStyle}>Tickets</th>
                                    <th style={tableHeaderStyle}>Total Price</th>
                                    <th style={tableHeaderStyle}>Booking Status</th>
                                    <th style={tableHeaderStyle}>Payment Status</th>
                                    <th style={tableHeaderStyle}>Booked Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {bookings.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            style={emptyCellStyle}
                                        >
                                            No bookings found.
                                        </td>
                                    </tr>
                                ) : (
                                    bookings.map((booking) => (
                                        <tr key={booking._id}>
                                            <td style={tableCellStyle}>
                                                {booking._id.slice(-8)}
                                            </td>

                                            <td style={tableCellStyle}>
                                                <strong>
                                                    {booking.customerName || "N/A"}
                                                </strong>
                                                <br />
                                                <small style={{
                                                    color: "#9ca3af"
                                                }}>
                                                    {booking.customerEmail || "N/A"}
                                                </small>
                                            </td>

                                            <td style={tableCellStyle}>
                                                {booking.eventTitle || "N/A"}
                                            </td>

                                            <td style={tableCellStyle}>
                                                {formatDate(booking.eventDate)}
                                            </td>

                                            <td style={tableCellStyle}>
                                                {booking.numberOfTickets ?? 0}
                                            </td>

                                            <td style={tableCellStyle}>
                                                <strong>
                                                    {formatCurrency(booking.totalPrice)}
                                                </strong>
                                            </td>

                                            <td style={tableCellStyle}>
                                                <span style={{
                                                    ...getStatusStyle(booking.status),
                                                    padding: "5px 10px",
                                                    borderRadius: "20px",
                                                    fontSize: "12px"
                                                }}>
                                                    {booking.status || "Pending"}
                                                </span>
                                            </td>

                                            <td style={tableCellStyle}>
                                                <span style={{
                                                    ...getStatusStyle(booking.paymentStatus),
                                                    padding: "5px 10px",
                                                    borderRadius: "20px",
                                                    fontSize: "12px"
                                                }}>
                                                    {booking.paymentStatus || "Pending"}
                                                </span>
                                            </td>

                                            <td style={tableCellStyle}>
                                                {formatDate(
                                                    booking.bookingDate ||
                                                    booking.createdAt
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

const tableHeaderStyle: React.CSSProperties = {
    padding: "14px 12px",
    fontSize: "13px",
    color: "#6b7280",
    borderBottom: "1px solid #e5e7eb",
    whiteSpace: "nowrap"
};

const tableCellStyle: React.CSSProperties = {
    padding: "15px 12px",
    fontSize: "13px",
    borderBottom: "1px solid #f1f1f1",
    color: "#374151",
    whiteSpace: "nowrap"
};

const emptyCellStyle: React.CSSProperties = {
    padding: "30px",
    textAlign: "center",
    color: "#9ca3af"
};
