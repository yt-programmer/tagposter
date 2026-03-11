import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
  Typography,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Upload, X, Loader2 } from "lucide-react";

const ProductModal = ({ isOpen, onClose, product, onSave, isSaving }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: null,
    description: "",
    image: null,
    category: "",
    imagePreview: "",
  });

  const [errors, setErrors] = useState({});

  const categories = ["Cars", "Anime", "Others"];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || null,
        description: product.description || "",
        category: product.category || "",
      });
    } else {
      setFormData({
        name: "",
        price: null,
        description: "",
        image: null,
        imagePreview: "",

        category: "",
      });
    }
    setErrors({});
  }, [product, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";

    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";

    if (!formData.description.trim())
      newErrors.description = "Product description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(
        {
          ...formData,

          price: parseFloat(formData.price),
        },
        product,
      );
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleChange = (field) => (event) => {
    const value =
      field === "price" ? Number(event.target.value) : event.target.value;

    setFormData({ ...formData, [field]: value });

    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: "#1c1917 ",
              color: "#fff",
              margin: 0,
              borderRadius: 3,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: 1,
              borderColor: "divider",
              py: 2,
              m: 0,
            }}
          >
            <Typography variant="h6" component="div" fontWeight="bold">
              {product ? "Edit Product" : "Add New Product"}
            </Typography>
            <IconButton onClick={onClose} size="small">
              <X size={20} className="text-white" />
            </IconButton>
          </DialogTitle>

          <form onSubmit={handleSubmit}>
            <DialogContent
              sx={{
                py: 3,

                "& .MuiInputBase-input": {
                  color: "white",
                },

                "& .MuiInputLabel-root": {
                  color: "white",
                },

                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                  " .MuiInputBase-input": {
                    color: "white",
                  },
                },

                "& .MuiFormHelperText-root": {
                  color: "#d6d3d1",
                },
              }}
            >
              <Stack spacing={3}>
                {!product && (
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      sx={{ mb: 1 }}
                    >
                      Product Image
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: { xs: "column", sm: "row" },

                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 2,
                          bgcolor: "grey.100",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                          border: "2px dashed",
                          borderColor: "grey.300",
                        }}
                      >
                        {formData.imagePreview ? (
                          <img
                            src={formData.imagePreview}
                            loading="lazy"
                            alt="Preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <Upload size={24} color="#9ca3af" />
                        )}
                      </Box>
                      <Button
                        component="label"
                        variant="outlined"
                        size="small"
                        sx={{
                          flex: 1,
                          color: "#fff",
                          border: "2px dashed #9ca3af",

                          textTransform: "none",
                          borderRadius: 2,
                        }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          name="image"
                          id="image"
                          required
                          className="text-white"
                          onChange={handleImageChange}
                        />
                      </Button>
                    </Box>
                  </Box>
                )}

                <TextField
                  label="Product Name *"
                  value={formData.name}
                  onChange={handleChange("name")}
                  error={!!errors.name}
                  helperText={errors.name}
                  fullWidth
                  required
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    label="Price ($) *"
                    type="number"
                    step="0.01"
                    inputProps={{ min: 0 }}
                    min="0"
                    value={formData.price}
                    onChange={handleChange("price")}
                    error={!!errors.price}
                    helperText={errors.price}
                    fullWidth
                    required
                    sx={{
                      input: { color: "white" },
                      label: { color: "white" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "white" },
                        "&:hover fieldset": { borderColor: "white" },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                    }}
                  />
                </Box>
                <TextField
                  label="Product Description *"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleChange("description")}
                  error={!!errors.description}
                  helperText={errors.description}
                  fullWidth
                  sx={{
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                  required
                />

                <FormControl fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    value={formData.category}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "white" },
                        " & .MuiSelect-icon": { color: "white" },

                        "&:hover fieldset": { borderColor: "white" },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                    }}
                    name="category"
                    label="Category"
                    required
                    onChange={handleChange("category")}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
              <Button
                onClick={onClose}
                variant="outlined"
                color="error"
                sx={{
                  flex: 1,
                  textTransform: "none",
                  borderRadius: 2,
                  py: 1.5,
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSaving}
                sx={{
                  flex: 1,
                  textTransform: "none",
                  borderRadius: 2,
                  py: 1.5,
                  bgcolor: "success.main",
                  "&:hover": {
                    bgcolor: "success.dark",
                  },
                }}
              >
                {isSaving && (
                  <Loader2
                    size={18}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                )}
                {product ? "Update Product" : "Add Product"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
