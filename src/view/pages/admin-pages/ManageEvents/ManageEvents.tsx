
import { useEffect, useState } from "react";
import { backendApi } from "../../../../api";

interface Event {
    _id: string;
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
    status?: "available" | "sold-out" | "coming-soon";
}

type EventFormData = Omit<Event, "_id">;

const initialFormData: EventFormData = {
    title: "",
    date: "",
    time: "",
    location: "",
    price: 0,
    attendees: 0,
    image: "",
    category: "",
    description: "",
    rating: 0,
    reviews: 0,
    organizer: "",
    status: "available"
};

export function ManageEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const [formData, setFormData] = useState<EventFormData>(initialFormData);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const fetchEvents = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await backendApi.get("/event/all");

            setEvents(
                response.data.map((event: any) => ({
                    ...event,
                    _id: event._id
                }))
            );
        } catch (err: any) {
            console.error("Failed to fetch events:", err);
            setError(
                err.response?.data?.error || "Failed to load events."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]:
                ["price", "attendees", "rating", "reviews"].includes(name)
                    ? Number(value)
                    : value
        }));
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setEditingId(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            if (editingId) {
                await backendApi.put(
                    `/event/update/${editingId}`,
                    formData
                );
                alert("Event updated successfully!");
            } else {
                await backendApi.post("/event/save", formData);
                alert("Event added successfully!");
            }

            resetForm();
            await fetchEvents();
        } catch (err: any) {
            console.error("Failed to save event:", err);

            const message =
                err.response?.data?.error || "Failed to save event.";

            setError(message);
            alert(message);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (event: Event) => {
        const { _id, ...eventData } = event;

        setFormData({
            ...initialFormData,
            ...eventData
        });

        setEditingId(_id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmed) return;

        try {
            setError("");

            await backendApi.delete(`/event/delete/${id}`);

            alert("Event deleted successfully!");

            if (editingId === id) {
                resetForm();
            }

            await fetchEvents();
        } catch (err: any) {
            console.error("Failed to delete event:", err);

            const message =
                err.response?.data?.error || "Failed to delete event.";

            setError(message);
            alert(message);
        }
    };

    return (
        <div style={{
            maxWidth: "1100px",
            margin: "30px auto",
            padding: "20px",
            fontFamily: "Arial, sans-serif"
        }}>
            <h1>Manage Events</h1>

            <p>Add, update and manage BookMyVibe events.</p>

            {error && (
                <div style={{
                    backgroundColor: "#fee2e2",
                    color: "#991b1b",
                    padding: "12px",
                    marginBottom: "20px",
                    borderRadius: "6px"
                }}>
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                    gap: "15px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    marginBottom: "30px"
                }}
            >
                <h2 style={{ gridColumn: "1 / -1" }}>
                    {editingId ? "Update Event" : "Add New Event"}
                </h2>

                <input
                    name="title"
                    placeholder="Event Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />

                <input
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />

                <input
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />

                <input
                    name="price"
                    type="number"
                    placeholder="Ticket Price"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />

                <input
                    name="attendees"
                    type="number"
                    placeholder="Maximum Attendees"
                    min="1"
                    value={formData.attendees}
                    onChange={handleChange}
                    required
                />

                <input
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />

                <input
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />

                <input
                    name="organizer"
                    placeholder="Organizer"
                    value={formData.organizer}
                    onChange={handleChange}
                />

                <input
                    name="rating"
                    type="number"
                    placeholder="Rating (0-5)"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating ?? 0}
                    onChange={handleChange}
                />

                <input
                    name="reviews"
                    type="number"
                    placeholder="Number of Reviews"
                    min="0"
                    value={formData.reviews ?? 0}
                    onChange={handleChange}
                />

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="available">Available</option>
                    <option value="sold-out">Sold Out</option>
                    <option value="coming-soon">Coming Soon</option>
                </select>

                <textarea
                    name="description"
                    placeholder="Event Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    style={{ gridColumn: "1 / -1" }}
                />

                <div style={{
                    gridColumn: "1 / -1",
                    display: "flex",
                    gap: "10px"
                }}>
                    <button type="submit" disabled={saving}>
                        {saving
                            ? "Saving..."
                            : editingId
                                ? "Update Event"
                                : "Add Event"}
                    </button>

                    {editingId && (
                        <button type="button" onClick={resetForm}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <h2>All Events ({events.length})</h2>

            {loading ? (
                <p>Loading events...</p>
            ) : events.length === 0 ? (
                <p>No events found. Add your first event above.</p>
            ) : (
                <div style={{ overflowX: "auto" }}>
                    <table style={{
                        width: "100%",
                        borderCollapse: "collapse"
                    }}>
                        <thead>
                            <tr>
                                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Event</th>
                                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Date</th>
                                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Location</th>
                                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Price</th>
                                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Status</th>
                                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {events.map((event) => (
                                <tr key={event._id}>
                                    <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                        {event.title}
                                    </td>

                                    <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                        {event.date}
                                    </td>

                                    <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                        {event.location}
                                    </td>

                                    <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                        Rs. {event.price}
                                    </td>

                                    <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                        {event.status}
                                    </td>

                                    <td style={{
                                        padding: "12px",
                                        borderBottom: "1px solid #ddd"
                                    }}>
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(event)}
                                        >
                                            Edit
                                        </button>

                                        {" "}

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(event._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
