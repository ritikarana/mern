import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Logout from "./Logout";

const Header: React.FC = () => {
    const [logout, setLogout] = useState(false);
    const location = useLocation();
    const path = location.pathname;
     
    useEffect(() => {
      if(path === '/' || path === '/register'){
        setLogout(false)
      } else {
        setLogout(true);
      }
    },[path])

    
    return(
        <header className="header">
            <h3>User Management App</h3>
           {logout ? <Logout /> : ''}
        </header>
    )

}

export default React.memo(Header);