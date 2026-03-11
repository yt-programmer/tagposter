import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <main className="font-sans">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
