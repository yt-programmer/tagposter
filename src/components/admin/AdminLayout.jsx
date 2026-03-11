import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";
const AdminLayout = ({ children }) => {
  const navigator = useNavigate();
  const handleLogout = async () => {
    try {
      toast.loading("Logging out...");

      const res = await fetch(`${import.meta.env.VITE_API}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({}),
      });

      const data = await res.json();

      if (res.ok) {
        toast.dismiss();
        toast.success("Logged out successfully");
        navigator("/");
      } else {
        toast.dismiss();
        toast.error(data.message);
      }

      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-stone-800">
      {/* Simple Top Header */}
      <header className="h-16 bg-stone-900/95 border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-bold text-white">
          Tag<span className="text-stone-400">Poster</span> Admin
        </h1>
        <button
          className="flex items-center gap-2 px-4 py-2 text-stone-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminLayout;
