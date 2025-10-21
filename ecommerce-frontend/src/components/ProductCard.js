import React, { useState } from "react";
import axios from "axios";

export default function ProductCard({ product, refresh }) {
  const [discount, setDiscount] = useState("");

  const handlePurchase = async () => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/products/products/${product.id}/purchase/`, {
        quantity: 1,
      });
      alert("✅ Purchase successful!");
      refresh();
    } catch (err) {
      alert("❌ Purchase failed: " + err.response?.data?.error);
    }
  };

  const applyDiscount = async () => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/products/products/${product.id}/apply_discount/`, {
        discount_percent: discount,
      });
      alert(`💸 Discount of ${discount}% applied!`);
      setDiscount("");
      refresh();
    } catch (err) {
      alert("Error applying discount");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px",
        width: "220px",
        background: "#f9f9f9",
      }}
    >
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Price:</strong> ${product.discounted_price.toFixed(2)}
      </p>
      <p>
        <strong>Stock:</strong> {product.stock}
      </p>
      <button onClick={handlePurchase} disabled={product.stock === 0}>
        🛒 Purchase
      </button>

      <div style={{ marginTop: "10px" }}>
        <input
          type="number"
          placeholder="Discount %"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          style={{ width: "100px" }}
        />
        <button onClick={applyDiscount}>Apply</button>
      </div>
    </div>
  );
      }
      
