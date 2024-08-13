import React from "react";
import { useNavigate } from "react-router";

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        window.sessionStorage.removeItem("token");
        const token = window.sessionStorage.getItem('token');
        if(!token){
            navigate("/");
            return null;
        }
    }
    return (
        <div className="logout" onClick={handleLogout}>Logout</div>
    )

}

export default Logout;