import React from "react";
import { SideBar } from "./SideBar";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./Header";
import useAuth from "../../../hooks/useAuth";
import { Loader } from "../public/Loader";

export const PrivateLAyout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return (
          <Loader />
    );
  } else {
    return (
      <>
        <div className="layout">
          {/* Header */}
          <Header />

          {/* Main content */}
          <section className="layout__content">
            {auth._id ? <Outlet /> : <Navigate to="/" />}
          </section>
          {/* SideBar */}
          <SideBar />
        </div>
      </>
    );
  }
};
