/* eslint-disable react-hooks/exhaustive-deps */
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import { setUser } from "../redux/Slices/authSlice";

const authRoutes = ["/dashboard"];

const AuthWrapper = ({ children }) => {
  const session = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      dispatch(setUser(session));
    });
  }, [dispatch]);

  if (session.status === "loading") return null;

  return (
    <>
      {authRoutes.includes(router.pathname) ? (
        <ProtectedRoute>{children}</ProtectedRoute>
      ) : (
        children
      )}
    </>
  );
};

export default AuthWrapper;
