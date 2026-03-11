import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Instagram, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed w-full bg-stone-900/95 backdrop-blur-md shadow-lg z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-5 md:px-8 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex justify-center items-center gap-3 text-xl md:text-2xl font-bold tracking-wide text-white"
          >
            <span>
              Tag<span className="text-stone-400">Poster</span>
            </span>
            <img
              src="/logo.jpg"
              alt="logo error"
              loading="lazy"
              className="w-10 h-10 rounded-full"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-10 font-medium">
            <a
              href="/#about"
              className="text-stone-300 hover:text-white transition"
            >
              About
            </a>
            <a
              href="/products"
              className="text-stone-300 hover:text-white transition"
            >
              Products
            </a>
            <a
              href="/#contact"
              className="text-stone-300 hover:text-white transition"
            >
              Contact
            </a>
          </nav>

          {/* Desktop Social */}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 h-screen w-72 bg-stone-900 shadow-xl z-50 p-8 flex flex-col"
            >
              <div className="flex justify-end">
                <button onClick={() => setOpen(false)} className="text-white">
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col gap-8 mt-12 text-lg font-medium">
                <a
                  onClick={() => setOpen(false)}
                  href="#about"
                  className="text-white hover:text-stone-400"
                >
                  About
                </a>
                <a
                  onClick={() => setOpen(false)}
                  href="#products"
                  className="text-white hover:text-stone-400"
                >
                  Products
                </a>
                <a
                  onClick={() => setOpen(false)}
                  href="#contact"
                  className="text-white hover:text-stone-400"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
