import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useEffect, useState } from "react";

export function ProtectedRoute({
                                   children,
                                   allowedRoles,
                               }: {
    children: JSX.Element
    allowedRoles: string[]
}) {
    const [role, setRole] = useState<string | null>(null)

    useEffect(() => {
        const storedRole = localStorage.getItem("role")
        setRole(storedRole)
    }, [])

    if (role === null) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />
    }

    return children
}
