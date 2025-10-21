import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";

const API_URL = "http://127.0.0.1:8000/api/products/products/";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    min_price: "",
    max_price: "",
    in_stock: false,
  });

  const fetchProducts = async () => {
    try {
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.min_price) params.min_price = filters.min_price;
      if (filters.max_price) params.max_price = filters.max_price;
      if (filters.in_stock) params.in_stock = "true";

      const res = await axios.get(API_URL, { params });
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛍️ Products</h1>
      <ProductFilter filters={filters} setFilters={setFilters} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} refresh={fetchProducts} />
        ))}
      </div>
    </div>
  );
          }
            
