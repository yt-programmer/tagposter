import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-5 md:px-10 text-center bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 pt-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-stone-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-stone-500 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <div className="inline-block px-4 py-2 mb-6 border border-stone-500 rounded-full">
          <span className="text-stone-300 text-sm font-medium tracking-wider uppercase">
            Premium Artworks
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight text-white">
          Custom Frames <br />
          Designed For <span className="text-stone-400">Passion</span>
        </h2>

        <p className="mt-6 text-lg md:text-xl text-stone-300 max-w-xl md:max-w-2xl mx-auto leading-relaxed">
          High quality framed posters made specially. Transform your space with
          premium artwork.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/products"
            className="bg-white text-stone-900 px-8 py-4 rounded-full font-semibold hover:bg-stone-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Explore Products
          </a>
          <a
            href="/#about"
            className="border-2 border-stone-400 text-white px-8 py-4 rounded-full font-semibold hover:bg-stone-700 hover:border-stone-700 transition-all duration-300"
          >
            Learn More
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
