import React from "react";
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "../utils/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userLoginReducer";

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const token = useSelector((state: RootState) => state.login.userInfo?.token);

    const handleLogout = () => {
        dispatch(logout())
        if (!token) {
            navigate("/");
            return null;
        }
    }
    return (
        <div className="logout" onClick={handleLogout}>Logout</div>
    )

}

export default Logout;