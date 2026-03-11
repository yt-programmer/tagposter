import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const me = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        setIsAuth(false);
      }
    };

    me();
  }, []);

  if (isAuth === false) return <Navigate to="/auth/login" replace />;
  if (isAuth === true) return children;
};

export default AdminRoute;
