import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");
    
    const isAuthenticated = token && token.length >= 145 && token.length <= 150;

    if (!isAuthenticated) {
      localStorage.removeItem("token");  
      return <Navigate to="/login" replace />;
    }
  
    return children;
}