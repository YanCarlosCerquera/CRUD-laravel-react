import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "auths/hooks/authHook";




const AuthRouterService = ({authOutlet, nonAuthOutlet}) => {
  const location = useLocation();
  const { isProfile } = useAuth();

  const authRoutes = [
    "/auth", 
    "/auth/", 
    "/auth/login", 
    "/auth/login/", 
    "/auth/register", 
    "/auth/register/"
  ];
  const isAuthRoute = authRoutes.includes(location.pathname);
  // console.log('lp',location.pathname)

  if (isProfile) {
    if (isAuthRoute) {
      return <Navigate to="/dashboard" />;
    } else {
      return nonAuthOutlet;
    }
  } else {
    if (isAuthRoute) {
      if (location.pathname === "/auth" || location.pathname === "/auth/") {
        return <Navigate to="/auth/login" />;
      } else {
        return authOutlet;
      }
    } else {
      return <Navigate to="/auth/login" />;
    }
  }
}

export default AuthRouterService