import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const API = process.env.REACT_APP_API_URL;

  const fetchProducts = () => {
    fetch("${API}/api/products/")
 
    // fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("${API}/api/products/", {
    // fetch("http://127.0.0.1:8000/api/products/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        setForm({ name: "", description: "", price: "", category: "" });
        fetchProducts();
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h2>Products</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <button type="submit">Add Product</button>
      </form>

      {products.length > 0 ? (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              {p.name} - ${p.price} ({p.category})
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Products;
        
