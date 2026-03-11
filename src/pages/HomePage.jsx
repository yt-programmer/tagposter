import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Products from "../components/Products";
import Contact from "../components/Contact";

const HomePage = () => {
  return (
    <section>
      <Hero />
      <Products />
      <About />
      <Contact />
    </section>
  );
};

export default HomePage;
