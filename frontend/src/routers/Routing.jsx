import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { PrivateLAyout } from "../components/layout/private/PrivateLAyout";
import { Loader } from "../components/layout/public/Loader";
import { PublicLayout } from "../components/layout/public/PublicLayout";
import { Feed } from "../components/publications/Feed";
import { Config } from "../components/user/Config";
import { LogOut } from "../components/user/LogOut";
import { People } from "../components/user/People";
import { SignInUp } from "../components/user/SignInUp";
import { AuthProvider } from "../context/AuthProvider";

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<SignInUp />} />  
            <Route path="loading" element={<Loader/>} />
          </Route>
          <Route path="/social" element={<PrivateLAyout />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
            <Route path="loading" element={<Loader/>} />
            <Route path="logout" element={<LogOut/>} />
            <Route path="people" element={<People/>} />
            <Route path="config" element={<Config/>} />

          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
