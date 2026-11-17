
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { ProtectedRoute } from "../../../auth/ProtectedRoute.tsx";

import {
    AdminPanel,
    AdminLayout
} from "../../pages/admin-pages/AdminPanel/AdminPanel.tsx";

import { ManageUsers } from "../../pages/admin-pages/ManageUsers/ManageUsers.tsx";
import { ManageEvents } from "../../pages/admin-pages/ManageEvents/ManageEvents.tsx";
import { ManageBookings } from "../../pages/admin-pages/ManageBookings/ManageBookings.tsx";
import { ManageCategories } from "../../pages/admin-pages/ManageCategories/ManageCategories.tsx";

import { Home } from "../../pages/Home/Home.tsx";
import { Events } from "../../pages/Events/Events.tsx";
import { About } from "../../pages/About/About.tsx";
import { Contact } from "../../pages/Contact/Contact.tsx";
import { Cart } from "../../pages/Cart/Cart.tsx";
import { Checkout } from "../../pages/Checkout/Checkout.tsx";
import { MyBookings } from "../../pages/MyBookings/MyBookings";

interface MainContentProps {
    cartItems?: any[];
    onAddToCart?: (item: any) => void;
    onUpdateQuantity?: (
        id: string,
        ticketTypeId: string,
        newQuantity: number
    ) => void;
    onRemoveItem?: (id: string, ticketTypeId: string) => void;
    onClearCart?: () => void;

    onConfirmBooking?: (details: {
        customerName: string;
        customerEmail: string;
        customerPhone: string;
        paymentMethod: 'credit-card' | 'debit-card' | 'paypal' | 'bank-transfer';
    }) => Promise<boolean>;
}

export function MainContent({
    cartItems,
    onAddToCart,
    onUpdateQuantity,
    onRemoveItem,
    onClearCart,
    onConfirmBooking
}: MainContentProps) {

    const navigate = useNavigate();

    const [role, setRole] = useState<string | null>(
        localStorage.getItem("role")
    );

    const location = useLocation();

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);
    }, [location.pathname]);

    return (
        <div>
            <Routes>

                {/* Admin Routes */}
                {role === 'admin' && (
                    <>

                        <Route
                            path="/admin-panel"
                            element={
                                <ProtectedRoute allowedRoles={["admin"]}>
                                    <AdminLayout>
                                        <AdminPanel />
                                    </AdminLayout>
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/manage-events"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <AdminLayout>
                                        <ManageEvents />
                                    </AdminLayout>
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/manage-users"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <AdminLayout>
                                        <ManageUsers />
                                    </AdminLayout>
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/manage-bookings"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <AdminLayout>
                                        <ManageBookings />
                                    </AdminLayout>
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/manage-categories"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <AdminLayout>
                                        <ManageCategories />
                                    </AdminLayout>
                                </ProtectedRoute>
                            }
                        />

                    </>
                )}

                {/* Customer Routes */}

                <Route
                    path="/"
                    element={
                        <Home onAddToCart={onAddToCart} />
                    }
                />

                <Route
                    path="/events"
                    element={
                        <Events onAddToCart={onAddToCart} />
                    }
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                {/* My Bookings Route */}

                <Route
                    path="/my-bookings"
                    element={
                        <ProtectedRoute allowedRoles={['user']}>
                            <MyBookings />
                        </ProtectedRoute>
                    }
                />

                {/* Cart Route */}

                <Route
                    path="/cart"
                    element={
                        <Cart
                            cartItems={cartItems}
                            onUpdateQuantity={onUpdateQuantity}
                            onRemoveItem={onRemoveItem}
                            onClearCart={onClearCart}
                            onCheckout={() => navigate("/checkout")}
                        />
                    }
                />

                {/* Checkout Route */}

                <Route
                    path="/checkout"
                    element={
                        <ProtectedRoute allowedRoles={['user', 'admin']}>
                            <Checkout
                                cartItems={cartItems || []}
                                onConfirmBooking={onConfirmBooking!}
                            />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </div>
    );
}
