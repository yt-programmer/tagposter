import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Filter, Grid, List } from "lucide-react";
import useGetProducts from "../hooks/useGetProducts";
import Loading from "../components/Loading";
import Error from "../components/Error";

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [page, setPage] = useState(1);
  const { products, loading, error } = useGetProducts(page, 10);
  const [linkImg, setLinkImg] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleNextPage = () => {
    if (products && products.length === 10) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "tagposter");

    const res = await fetch(import.meta.env.VITE_CLOUDINARY, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const link = await uploadImage(file);
    setLinkImg(link);
  };

  const handleFilter = (category) => {
    setActiveFilter(category);

    if (category === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category,
      );
      setFilteredProducts(filtered);
    }
  };

  const categories = ["All", "Cars", "Anime", "Others"];

  const whatsappNumber = "201002848297";

  return (
    <div className="min-h-screen bg-stone-900 pt-32 pb-20 px-5 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-stone-400  font-medium tracking-wider uppercase text-sm">
            Premium Collection
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 text-white">
            All Products
          </h1>
          <p className="text-stone-400 mt-4 max-w-2xl mx-auto text-lg">
            Browse our complete collection of premium framed artworks. Each
            piece is crafted with meticulous attention to detail.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6"
        >
          <div className=" hidden md:flex gap-2 bg-stone-800 p-1 rounded-full">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-stone-900"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-full transition-colors ${
                viewMode === "list"
                  ? "bg-white text-stone-900"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              <List size={20} />
            </button>
          </div>

          <div className=" flex gap-2 bg-stone-800 py-3 px-6 rounded-full">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleFilter(category)}
                className={`${category === activeFilter ? "bg-white p-3 rounded-full" : ""} hover:p-3 hover:rounded-full hover:bg-white transition-all duration-500 text-stone-400 cursor-pointer font-medium tracking-wider uppercase text-sm mr-4`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {error && <Error error={error} />}
        {loading && <Loading />}

        <motion.div
          layout
          className={
            viewMode === "grid"
              ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }
        >
          {!error &&
            !loading &&
            filteredProducts &&
            filteredProducts.length !== 0 &&
            filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={
                  viewMode === "grid"
                    ? "group shadow-[0px_0px_16px_12px_rgba(41,37,36,0.81)] overflow-hidden hover:bg-stone-700 transition-all duration-500 hover:shadow-2xl hover:shadow-stone-900/50 flex flex-col h-full"
                    : "group rounded-3xl shadow-[0px_0px_16px_12px_rgba(41,37,36,0.81)] border-stone-100 overflow-hidden hover:bg-stone-700 transition-all duration-500 flex flex-row h-full"
                }
              >
                {/* Image */}
                <div
                  className={
                    viewMode === "grid"
                      ? "w-full relative overflow-hidden"
                      : "w-48 relative overflow-hidden"
                  }
                >
                  <div className="aspect-square w-full h-full bg-[#c5c0c0] flex items-center justify-center p-4">
                    <img
                      src={product.image}
                      loading="lazy"
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col flex-1 min-w-0">
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {product.name}
                  </h4>
                  <p className="text-stone-400 text-sm break-words mb-4">
                    {product.description}
                  </p>

                  {/* السعر + الزر */}
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
            ))}
        </motion.div>

        {/* Empty State */}
        {!error &&
          !loading &&
          filteredProducts &&
          filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-stone-400 text-lg">
                No products found in this category.
              </p>
            </div>
          )}

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-5 mt-12"
        >
          <button
            onClick={handlePreviousPage}
            className="inline-flex items-center gap-2 px-5 py-3 bg-stone-800 hover:bg-stone-700 text-white font-medium rounded-xl transition shadow-lg shadow-stone-800/40"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="inline-flex items-center gap-2 px-5 py-3 bg-stone-800 text-white font-medium rounded-xl">
            {page}
          </span>
          <button
            onClick={handleNextPage}
            className="inline-flex items-center gap-2 px-5 py-3 bg-stone-800 hover:bg-stone-700 text-white font-medium rounded-xl transition shadow-lg shadow-stone-800/40"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >
          <div className="bg-stone-800 rounded-3xl p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-stone-400 mb-8 max-w-xl mx-auto">
              We offer custom designs! Contact us through Instagram or WhatsApp
              to discuss your custom car frame requirements.
            </p>

            <div className="flex justify-center items-center gap-4">
              <input
                type="file"
                accept="image/*"
                name="image"
                id="image"
                className="text-white px-5 py-2 bg-stone-900 rounded-2xl flex justify-center"
                required
                onChange={handleImageChange}
              />

              <a
                className={`${!linkImg ? " pointer-events-none opacity-50 cursor-not-allowed " : ""} py-2 px-6 bg-white rounded-2xl  justify-center`}
                href={
                  linkImg
                    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        `I want make poster for this image ${linkImg}`,
                      )}`
                    : "#"
                }
              >
                send
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsPage;
