import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    discount_percent: "",
  });

  // Default to localhost if .env is missing
  const API = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

  // ✅ Fetch all products
  const fetchProducts = () => {
    fetch(`${API}/api/products/`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  // ✅ Submit a new product
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API}/api/products/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add product");
        return res.json();
      })
      .then(() => {
        setForm({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          discount_percent: "",
        });
        fetchProducts();
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Products</h2>

      {/* ✅ Product Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
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
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
          <option value="furniture">Furniture</option>
        </select>
        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Discount (%)"
          value={form.discount_percent}
          onChange={(e) =>
            setForm({ ...form, discount_percent: e.target.value })
          }
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Add Product
        </button>
      </form>

      {/* ✅ Product List */}
      {products.length > 0 ? (
        <ul>
          {products.map((p) => (
            <li key={p.id} className="mb-2 border-b pb-2">
              <strong>{p.name}</strong> - ${p.price} ({p.category})
              <br />
              Stock: {p.stock} | Discount: {p.discount_percent}% <br />
              <span className="text-green-600">
                Discounted Price: ${(
                  p.price -
                  p.price * (p.discount_percent / 100)
                ).toFixed(2)}
              </span>
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
    
