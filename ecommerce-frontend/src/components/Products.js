import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    discount_percent: "",
  });

  const API = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

  const fetchProducts = () => {
    fetch(`${API}/api/products/`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = form.id ? "PUT" : "POST";
    const url = form.id
      ? `${API}/api/products/${form.id}/`
      : `${API}/api/products/`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save product");
        return res.json();
      })
      .then(() => {
        resetForm();
        fetchProducts();
      })
      .catch((err) => console.error("Error saving product:", err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    fetch(`${API}/api/products/${id}/`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete product");
        fetchProducts();
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      discount_percent: product.discount_percent,
    });
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      discount_percent: "",
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-6 border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          🛒 Product Management
        </h2>

        {/* Product Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
        >
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Discount (%)"
            value={form.discount_percent}
            onChange={(e) =>
              setForm({ ...form, discount_percent: e.target.value })
            }
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="sm:col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="sm:col-span-2 flex gap-3 justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold shadow-md transition-all"
            >
              {form.id ? "💾 Update Product" : "➕ Add Product"}
            </button>
            {form.id && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md transition-all"
              >
                ✖ Cancel
              </button>
            )}
          </div>
        </form>

        {/* Product List */}
        {products.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="p-4 border rounded-xl shadow hover:shadow-md transition-all bg-gradient-to-tr from-gray-50 to-gray-100 relative"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {p.name}
                </h3>
                <p className="text-gray-600 mb-2 text-sm">
                  {p.description || "No description available."}
                </p>
                <p className="text-sm text-gray-500">
                  Category:{" "}
                  <span className="font-medium text-gray-700">
                    {p.category}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Stock:{" "}
                  <span className="font-medium text-gray-700">
                    {p.stock}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Discount:{" "}
                  <span className="text-blue-600 font-medium">
                    {p.discount_percent}%
                  </span>
                </p>
                <p className="text-lg font-semibold text-green-600 mt-2">
                  ${(
                    p.price -
                    p.price * (p.discount_percent / 100)
                  ).toFixed(2)}
                </p>

                {/* Edit/Delete Buttons */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-sm font-medium"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm font-medium"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 italic">
            No products found. Add one above 👆
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
  
