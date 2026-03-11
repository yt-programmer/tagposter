import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Loading from "../Loading";
import useGetProducts from "../../hooks/useGetProducts";
import Error from "../Error";

const ProductsTable = ({
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  page,
  setPage,
  products,
  error,
  loading,
}) => {
  const onPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const onNextPage = () => {
    if (products && products.length === 10) {
      setPage(page + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-300">Products</h2>
          <p className="text-stone-400 text-sm mt-1">
            Manage your product inventory
          </p>
        </div>
        <button
          onClick={onAddProduct}
          className="inline-flex items-center gap-2 px-5 py-3 bg-stone-600 hover:bg-stone-700 text-white font-medium rounded-xl transition shadow-lg shadow-stone-500/20"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div className="bg-stone-800 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full ">
            <thead>
              <tr className="bg-stone-900 border-b border-slate-200">
                <th className="text-left p-4">
                  <button className="text-xs font-semibold text-stone-200 uppercase tracking-wider hover:text-emerald-600 transition">
                    Product
                  </button>
                </th>

                <th className="text-left p-4">
                  <button className="text-xs font-semibold text-stone-200 uppercase tracking-wider hover:text-emerald-600 transition">
                    Price
                  </button>
                </th>
                <th className="text-left p-4">
                  <button className="text-xs font-semibold text-stone-200 uppercase tracking-wider hover:text-emerald-600 transition">
                    category
                  </button>
                </th>

                <th className="text-right p-4">
                  <span className="text-xs font-semibold text-stone-200 uppercase tracking-wider">
                    Actions
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {loading && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center">
                      <Loading />
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center">
                      <Error error={error} />
                    </td>
                  </tr>
                )}
                {!error && !loading && products && products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center">
                          <Search size={24} className="text-stone-300" />
                        </div>
                        <p className="text-stone-300">No products found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  !error &&
                  !loading &&
                  products &&
                  products.length !== 0 &&
                  products.map((product, index) => (
                    <motion.tr
                      key={product._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-slate-100 hover:bg-stone-700 transition"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-stone-700 overflow-hidden flex-shrink-0">
                            {product.image ? (
                              <img
                                src={product.image}
                                loading="lazy"
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-stone-200 text-xs">
                                No IMG
                              </div>
                            )}
                          </div>
                          <span className="font-medium text-stone-300">
                            {product.name}
                          </span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="font-semibold text-stone-300">
                          {Number(product.price).toLocaleString()} EGP
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-stone-300">
                          {product.category}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onEditProduct(product)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition text-stone-300 hover:text-emerald-600"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => onDeleteProduct(product._id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition text-stone-300 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={6} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={onPreviousPage}
                        className="p-2 hover:bg-slate-100 rounded-lg transition text-stone-100 hover:text-emerald-600"
                        title="Previous Page"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={onNextPage}
                        className="p-2 hover:bg-slate-100 rounded-lg transition text-stone-100 hover:text-emerald-600"
                        title="Next Page"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                    <span className="text-sm text-stone-100">Page {page}</span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
