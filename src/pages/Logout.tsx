import { logoutUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    if (!auth) {
        throw new Error("AuthContext is undefined. Make sure you are using LogoutButton within an AuthProvider.");
    }
    const { setUser, setIsAuthenticated } = auth;

    const handleLogout = async () => {
        try {
            await logoutUser()
            setUser(null)
            setIsAuthenticated(false)
            navigate('/login')
        } catch (error) {
            console.log('logout Error', error)
        }
    }

    return (
        <div>
            <button className="text-white bg-gray-800 cursor-pointer focus:outline-none focus:ring-4 focus:ring-black-800 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black-800 dark:hover:bg-gray-700 dark:focus:ring-black-700 dark:border-black-700" onClick={handleLogout}>Logout</button>
        </div>
    )
} 


export default LogoutButton