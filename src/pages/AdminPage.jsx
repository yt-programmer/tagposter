import React, { useEffect, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import ProductsTable from "../components/admin/ProductsTable";
import ProductModal from "../components/admin/ProductModal";
import useGetProducts from "../hooks/useGetProducts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editId, setEditId] = useState(null);

  const [page, setPage] = useState(1);

  const { products, loading, error } = useGetProducts(page, 10);

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setAllProducts(products || []);
  }, [products]);
  const navigator = useNavigate();

  const editProduct = async (data, id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/products/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (response.ok) {
        setAllProducts(result.data.products);
        toast.success("Product updated successfully");
      } else {
        if (result.message === "You are not logged in") {
          navigator("/auth/login");
          return;
        }
        toast.error(
          result.message || result.errors[0].msg || "Failed to update product",
        );
      }
    } catch (error) {
      toast.dismiss();

      if (error.message === "You are not logged in") {
        navigator("/auth/login");
        return;
      }
      toast.error(
        error.message || error.errors[0].msg || "Failed to update product",
      );
    }
  };

  const handleAddProduct = async () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
    setEditId(product._id);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        toast.loading("Deleting product...");

        const response = await fetch(
          `${import.meta.env.VITE_API}/products/${productId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        const data = await response.json();

        if (response.ok) {
          toast.dismiss();
          setAllProducts(data.data.products);
          toast.success("Product deleted successfully");
        } else {
          toast.dismiss();
          if (data.message === "You are not logged in") {
            navigator("/auth/login");
            return;
          }
          toast.error(
            data.message || data.errors[0].msg || "Failed to delete product",
          );
        }
      }
    } catch (error) {
      toast.dismiss();
      if (error.message === "You are not logged in") {
        navigator("/auth/login");
        return;
      }

      toast.error(error.message || "An error occurred while deleting product");
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
  const createProducts = async (data) => {
    try {
      const imageUrl = await uploadImage(data.image);
      const response = await fetch(`${import.meta.env.VITE_API}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          description: data.description,
          name: data.name,
          price: data.price,
          category: data.category,

          image: imageUrl,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setAllProducts(result.data.products);
        toast.success("Product created successfully");
      } else {
        if (result.message === "You are not logged in") {
          navigator("/auth/login");
          return;
        }
        toast.error(
          result.message || result.errors[0].msg || "Failed to create product",
        );
      }
    } catch (error) {
      toast.dismiss();
      if (error.message === "You are not logged in") {
        navigator("/auth/login");
        return;
      }
      toast.error(
        error.message || error.errors[0].msg || "Failed to create product",
      );
    }
  };

  const handleSaveProduct = async (productData, product) => {
    setIsSaving(true);

    if (!product) {
      await createProducts(productData);
    } else {
      await editProduct(productData, editId);
    }

    setIsSaving(false);
    setModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <AdminLayout>
      <ProductsTable
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        products={allProducts}
        loading={loading}
        error={error}
        page={page}
        setPage={setPage}
      />

      <ProductModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onSave={handleSaveProduct}
        isSaving={isSaving}
      />
    </AdminLayout>
  );
};

export default AdminPage;
