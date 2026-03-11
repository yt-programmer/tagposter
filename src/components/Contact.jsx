import React from "react";
import { motion } from "framer-motion";
import { Instagram, MessageCircle, Mail } from "lucide-react";

const Contact = () => {
  const whatsappNumber = "201002848297";
  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-5 md:px-10 bg-stone-900 text-center relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-stone-900 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-stone-600 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-stone-500 font-medium tracking-wider uppercase text-sm">
          Get In Touch
        </span>
        <h3 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-stone-300">
          Let's Connect
        </h3>

        <p className="text-stone-600 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          Ready to order your custom frame? Reach us directly through Instagram
          or WhatsApp and we'll handle everything for you.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {/* Instagram */}
          <motion.a
            href="https://www.instagram.com/tag_poster/"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex text-white items-center justify-center gap-3 border-2 border-stone-900 px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:border-transparent hover:text-white transition-all duration-300 shadow-lg"
          >
            <Instagram size={24} />
            Instagram
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg"
          >
            <MessageCircle size={24} />
            WhatsApp
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
