import useAuth from "../context/AuthContext.tsx";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({secure = true, children}: any) => {
    const {user} = useAuth();
    if (secure && user == null) {
        return <Navigate to="/login" replace/>
    } else if (!secure && user != null) {
        return <Navigate to="/" replace/>
    }
    return children
}
export default ProtectedRoute;