import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import useGetProducts from "../hooks/useGetProducts";
import Loading from "./Loading";
import Error from "./Error";

const Products = () => {
  const { products, loading, error } = useGetProducts(1, 3);

  const whatsappNumber = "201002848297";
  return (
    <section
      id="products"
      className="py-24 md:py-32 px-5 md:px-10 bg-stone-900 text-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-stone-400 font-medium tracking-wider uppercase text-sm">
            Featured Collection
          </span>
          <h3 className="text-4xl md:text-5xl font-bold mt-4 text-white">
            Our Products
          </h3>
          <p className="text-stone-400 mt-4 max-w-2xl mx-auto">
            Discover our premium collection of framed car artworks, each crafted
            with meticulous attention to detail.
          </p>
        </motion.div>

        <div className="grid  sm:grid-cols-2  lg:grid-cols-3 gap-8">
          {loading && <Loading />}
          {error && <Error error={error} />}
          {!loading && !error && products && products.length !== 0
            ? products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group flex flex-col h-full shadow-[0px_0px_16px_12px_rgba(41,37,36,0.81)] overflow-hidden hover:bg-stone-700 transition-all duration-500"
                >
                  <div className="w-full h-72 aspect-square bg-[#c5c0c0] flex items-center justify-center p-4">
                    <img
                      src={product.image}
                      loading="lazy"
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="p-3 flex flex-col flex-1">
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {product.name}
                    </h4>
                    <p className="text-stone-400 text-sm mb-5 break-words">
                      {product.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-lg font-bold text-white">
                        {Number(product.price).toLocaleString()} EGP
                      </span>
                      <a
                        className="bg-white text-stone-900 px-6 py-3 text-center rounded-full text-sm font-semibold hover:bg-stone-900 hover:text-white transition-colors"
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                          `I want this poster ${product.name}`,
                        )}`}
                      >
                        Buy now
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            : !error &&
              !loading && (
                <div className="col-span-full text-center py-16">
                  <p className="text-stone-400 text-lg">
                    🚫 No products available.
                  </p>
                </div>
              )}
        </div>

        {/* CTA */}
        {!error && !loading && products && products.length !== 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <a
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-full font-semibold hover:bg-stone-200 transition-all duration-300"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Products;
