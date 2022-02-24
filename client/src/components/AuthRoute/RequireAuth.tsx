import { Navigate, useLocation } from "react-router-dom";


function RequireAuth({ children }: { children: JSX.Element }) {
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (!token && typeof token === "string") {
        return <Navigate to="/" state={{ from: location }} replace />
    }

    return children;
}

export default RequireAuth;