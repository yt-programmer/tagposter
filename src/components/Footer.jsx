import React from "react";
import { Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  const whatsappNumber = "201002848297";
  return (
    <footer className="bg-stone-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Tag<span className="text-stone-400">Poster</span>
            </h3>
            <p className="text-stone-400 leading-relaxed">
              Premium framed car artworks for passionate car enthusiasts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/#about"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/tag_poster/"
                target="_blank"
                className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-stone-700 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-stone-700 transition-colors"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>
        <p className="text-stone-500 text-sm flex items-center justify-center gap-1 pb-5">
          made by{" "}
          <a
            href="https://wa.me/201200722824"
            target="_blank"
            className="underline text-stone-100"
          >
            youssef tarek
          </a>
        </p>

        {/* Bottom */}
        <div className="pt-8 border-t border-stone-800 text-center">
          <p className="text-stone-500 text-sm">
            © {new Date().getFullYear()} Tag Poster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
