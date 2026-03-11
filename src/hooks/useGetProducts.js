import { useState, useEffect } from "react";
const useGetProducts = (page, limit) => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/products?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to fetch products");
        setLoading(false);
      } else {
        setProducts(data.data.products);
      }
    } catch (error) {
      setError(error.message || "An error occurred while fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, limit]);

  return { products, loading, error };
};

export default useGetProducts;
