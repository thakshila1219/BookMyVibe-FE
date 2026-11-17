
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { backendApi } from "../../../../api";
import "./AdminLayout.css";

// Interfaces

interface AdminLayoutProps {
    children: React.ReactNode;
}

interface EventData {
    _id: string;
    title: string;
    date: string;
    time?: string;
    location?: string;
    price?: number;
    status?: string;
}

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

interface UserData {
    _id: string;
    username: string;
    email: string;
    role: string;
}

// Admin Layout

export function AdminLayout({ children }: AdminLayoutProps) {

    const adminNavigationItems = [
        { name: "Dashboard", href: "/admin-panel", icon: "📊" },
        { name: "Manage Events", href: "/manage-events", icon: "🎫" },
        { name: "Manage Bookings", href: "/manage-bookings", icon: "📅" }
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        localStorage.removeItem("username");

        window.location.href = "/login";
    };

    return (
        <div style={{
            display: "flex",
            minHeight: "100vh",
            fontFamily: "Arial, sans-serif"
        }}>

            {/* Sidebar */}

            <aside style={{
                width: "240px",
                background: "#171827",
                color: "white",
                padding: "25px 15px",
                flexShrink: 0
            }}>

                <h2 style={{
                    marginBottom: "8px",
                    fontSize: "23px"
                }}>
                    BookMyVibe
                </h2>

                <p style={{
                    color: "#9ca3af",
                    fontSize: "12px",
                    letterSpacing: "2px",
                    marginBottom: "35px"
                }}>
                    ADMIN PANEL
                </p>

                <nav style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                }}>

                    {adminNavigationItems.map(item => (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            style={({ isActive }) => ({
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "13px",
                                color: "white",
                                textDecoration: "none",
                                borderRadius: "8px",
                                background: isActive
                                    ? "#5145cd"
                                    : "transparent"
                            })}
                        >
                            <span>{item.icon}</span>
                            {item.name}
                        </NavLink>
                    ))}

                </nav>

                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: "40px",
                        padding: "12px",
                        width: "100%",
                        cursor: "pointer",
                        border: "none",
                        borderRadius: "7px",
                        background: "#dc3545",
                        color: "white",
                        fontSize: "14px"
                    }}
                >
                    Logout
                </button>

            </aside>

            {/* Main Content */}

            <main className="admin-main-content">
                {children}
            </main>

        </div>
    );
}

// Admin Dashboard

export function AdminPanel() {

    const [events, setEvents] = useState<EventData[]>([]);
    const [users, setUsers] = useState<UserData[]>([]);
    const [bookings, setBookings] = useState<BookingData[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch Dashboard Data

    const fetchDashboardData = async () => {

        try {
            setLoading(true);
            setError("");

            const [eventResponse, userResponse, bookingResponse] =
                await Promise.all([
                    backendApi.get("/event/all"),
                    backendApi.get("/user/"),
                    backendApi.get("/booking/")
                ]);

            setEvents(eventResponse.data);
            setUsers(userResponse.data);
            setBookings(bookingResponse.data);

        } catch (error: any) {

            console.error("Dashboard data loading error:", error);

            setError(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Unable to load dashboard data. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Calculate Total Revenue

    const totalRevenue = bookings
        .filter(booking =>
            booking.paymentStatus === "paid" &&
            booking.status !== "cancelled" &&
            booking.status !== "refunded"
        )
        .reduce(
            (total, booking) => total + Number(booking.totalPrice || 0),
            0
        );

    // Recent Bookings

    const recentBookings = [...bookings]
        .sort((a, b) => {
            const dateA = new Date(
                a.bookingDate || a.createdAt || 0
            ).getTime();

            const dateB = new Date(
                b.bookingDate || b.createdAt || 0
            ).getTime();

            return dateB - dateA;
        })
        .slice(0, 5);

    // Upcoming Events

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = [...events]
        .filter(event => {
            const eventDate = new Date(event.date);

            return (
                !isNaN(eventDate.getTime()) &&
                eventDate >= today
            );
        })
        .sort(
            (a, b) =>
                new Date(a.date).getTime() -
                new Date(b.date).getTime()
        )
        .slice(0, 5);

    // Format Currency

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-LK", {
            style: "currency",
            currency: "LKR",
            maximumFractionDigits: 2
        }).format(amount);
    };

    // Format Date

    const formatDate = (date: string) => {
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

    // Dashboard Summary Cards

    const dashboardCards = [
        {
            title: "Total Events",
            value: events.length,
            icon: "🎫",
            color: "#5145cd",
            description: "All available events",
            link: "/manage-events"
        },
        {
            title: "Total Users",
            value: users.length,
            icon: "👥",
            color: "#0d9488",
            description: "Registered users",
            link: "/manage-users"
        },
        {
            title: "Total Bookings",
            value: bookings.length,
            icon: "📅",
            color: "#e58b20",
            description: "All customer bookings",
            link: "/manage-bookings"
        },
        {
            title: "Total Revenue",
            value: formatCurrency(totalRevenue),
            icon: "💰",
            color: "#16a34a",
            description: "Paid bookings only",
            link: "/manage-bookings"
        }
    ];

    return (

        <div>

            {/* Dashboard Header */}

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "15px",
                marginBottom: "30px"
            }}>

                <div>
                    <h1 style={{
                        fontSize: "28px",
                        color: "#171827",
                        marginBottom: "8px"
                    }}>
                        Admin Dashboard
                    </h1>

                    <p style={{
                        color: "#6b7280",
                        margin: 0
                    }}>
                        Welcome to BookMyVibe Administration Panel.
                    </p>
                </div>

                <button
                    onClick={fetchDashboardData}
                    disabled={loading}
                    style={{
                        padding: "11px 18px",
                        background: "#5145cd",
                        color: "white",
                        border: "none",
                        borderRadius: "7px",
                        cursor: "pointer"
                    }}
                >
                    {loading ? "Loading..." : "↻ Refresh"}
                </button>

            </div>

            {/* Loading */}

            {loading && (
                <p style={{ color: "#6b7280" }}>
                    Loading dashboard data...
                </p>
            )}

            {/* Error */}

            {!loading && error && (
                <div style={{
                    padding: "15px",
                    background: "#fee2e2",
                    color: "#991b1b",
                    borderRadius: "8px",
                    marginBottom: "20px"
                }}>
                    {error}
                </div>
            )}

            {/* Dashboard Cards */}

            {!loading && !error && (

                <>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "20px",
                        marginBottom: "35px"
                    }}>

                        {dashboardCards.map(card => (

                            <Link
                                key={card.title}
                                to={card.link}
                                style={{
                                    display: "block",
                                    background: "white",
                                    padding: "22px",
                                    borderRadius: "12px",
                                    textDecoration: "none",
                                    color: "#171827",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                                }}
                            >

                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>

                                    <div>
                                        <p style={{
                                            color: "#6b7280",
                                            margin: "0 0 10px"
                                        }}>
                                            {card.title}
                                        </p>

                                        <h2 style={{
                                            fontSize: "25px",
                                            margin: 0,
                                            color: "#171827"
                                        }}>
                                            {card.value}
                                        </h2>
                                    </div>

                                    <div style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "12px",
                                        background: `${card.color}18`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "25px"
                                    }}>
                                        {card.icon}
                                    </div>

                                </div>

                                <p style={{
                                    color: "#9ca3af",
                                    fontSize: "12px",
                                    marginBottom: 0,
                                    marginTop: "15px"
                                }}>
                                    {card.description}
                                </p>

                            </Link>

                        ))}

                    </div>

                    {/* Recent Bookings */}

                    <div style={{
                        background: "white",
                        padding: "22px",
                        borderRadius: "12px",
                        marginBottom: "30px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                    }}>

                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "20px"
                        }}>

                            <h2 style={{
                                fontSize: "20px",
                                margin: 0
                            }}>
                                Recent Bookings
                            </h2>

                            <Link
                                to="/manage-bookings"
                                style={{
                                    color: "#5145cd",
                                    textDecoration: "none",
                                    fontSize: "14px"
                                }}
                            >
                                View All →
                            </Link>

                        </div>

                        <div style={{ overflowX: "auto" }}>

                            <table style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                minWidth: "650px"
                            }}>

                                <thead>
                                    <tr style={{
                                        background: "#f5f6fa",
                                        textAlign: "left"
                                    }}>
                                        <th style={tableHeaderStyle}>Customer</th>
                                        <th style={tableHeaderStyle}>Event</th>
                                        <th style={tableHeaderStyle}>Tickets</th>
                                        <th style={tableHeaderStyle}>Amount</th>
                                        <th style={tableHeaderStyle}>Status</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {recentBookings.length === 0 ? (

                                        <tr>
                                            <td
                                                colSpan={5}
                                                style={emptyCellStyle}
                                            >
                                                No bookings found.
                                            </td>
                                        </tr>

                                    ) : (

                                        recentBookings.map(booking => (

                                            <tr key={booking._id}>

                                                <td style={tableCellStyle}>
                                                    <strong>
                                                        {booking.customerName}
                                                    </strong>
                                                    <br />
                                                    <small style={{
                                                        color: "#9ca3af"
                                                    }}>
                                                        {booking.customerEmail}
                                                    </small>
                                                </td>

                                                <td style={tableCellStyle}>
                                                    {booking.eventTitle}
                                                </td>

                                                <td style={tableCellStyle}>
                                                    {booking.numberOfTickets}
                                                </td>

                                                <td style={tableCellStyle}>
                                                    {formatCurrency(
                                                        booking.totalPrice
                                                    )}
                                                </td>

                                                <td style={tableCellStyle}>
                                                    <span style={{
                                                        padding: "5px 10px",
                                                        borderRadius: "20px",
                                                        fontSize: "12px",
                                                        background:
                                                            booking.status === "confirmed"
                                                                ? "#dcfce7"
                                                                : booking.status === "cancelled"
                                                                    ? "#fee2e2"
                                                                    : "#fef3c7",
                                                        color:
                                                            booking.status === "confirmed"
                                                                ? "#166534"
                                                                : booking.status === "cancelled"
                                                                    ? "#991b1b"
                                                                    : "#92400e"
                                                    }}>
                                                        {booking.status}
                                                    </span>
                                                </td>

                                            </tr>

                                        ))

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* Upcoming Events */}

                    <div style={{
                        background: "white",
                        padding: "22px",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                    }}>

                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "20px"
                        }}>

                            <h2 style={{
                                fontSize: "20px",
                                margin: 0
                            }}>
                                Upcoming Events
                            </h2>

                            <Link
                                to="/manage-events"
                                style={{
                                    color: "#5145cd",
                                    textDecoration: "none",
                                    fontSize: "14px"
                                }}
                            >
                                Manage Events →
                            </Link>

                        </div>

                        {upcomingEvents.length === 0 ? (

                            <p style={{
                                color: "#9ca3af",
                                textAlign: "center",
                                padding: "20px"
                            }}>
                                No upcoming events found.
                            </p>

                        ) : (

                            <div style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(200px, 1fr))",
                                gap: "15px"
                            }}>

                                {upcomingEvents.map(event => (

                                    <div
                                        key={event._id}
                                        style={{
                                            padding: "18px",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "10px"
                                        }}
                                    >

                                        <h3 style={{
                                            fontSize: "16px",
                                            margin: "0 0 12px",
                                            color: "#171827"
                                        }}>
                                            {event.title}
                                        </h3>

                                        <p style={{
                                            color: "#6b7280",
                                            fontSize: "13px"
                                        }}>
                                            📅 {formatDate(event.date)}
                                        </p>

                                        <p style={{
                                            color: "#6b7280",
                                            fontSize: "13px"
                                        }}>
                                            🕒 {event.time || "Time not specified"}
                                        </p>

                                        <p style={{
                                            color: "#6b7280",
                                            fontSize: "13px"
                                        }}>
                                            📍 {event.location || "Location not specified"}
                                        </p>

                                        {event.price !== undefined && (
                                            <strong style={{
                                                color: "#5145cd"
                                            }}>
                                                {formatCurrency(event.price)}
                                            </strong>
                                        )}

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </>

            )}

        </div>
    );
}

// Table Styles

const tableHeaderStyle: React.CSSProperties = {
    padding: "13px",
    fontSize: "13px",
    color: "#6b7280",
    borderBottom: "1px solid #e5e7eb"
};

const tableCellStyle: React.CSSProperties = {
    padding: "15px 13px",
    fontSize: "13px",
    borderBottom: "1px solid #f1f1f1",
    color: "#374151"
};

const emptyCellStyle: React.CSSProperties = {
    padding: "25px",
    textAlign: "center",
    color: "#9ca3af"
};
