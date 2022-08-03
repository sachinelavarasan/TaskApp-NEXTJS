import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { authSelector } from "../redux/Slices/authSlice";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user, isLoading } = useSelector(authSelector);

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [router, user]);

  if (!user) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
