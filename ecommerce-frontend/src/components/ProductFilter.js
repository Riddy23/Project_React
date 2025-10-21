import React from "react";

export default function ProductFilter({ filters, setFilters }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label>
        Category:
        <input
          type="text"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />
      </label>
      <label style={{ marginLeft: "10px" }}>
        Min Price:
        <input
          type="number"
          value={filters.min_price}
          onChange={(e) => setFilters({ ...filters, min_price: e.target.value })}
        />
      </label>
      <label style={{ marginLeft: "10px" }}>
        Max Price:
        <input
          type="number"
          value={filters.max_price}
          onChange={(e) => setFilters({ ...filters, max_price: e.target.value })}
        />
      </label>
      <label style={{ marginLeft: "10px" }}>
        In Stock Only:
        <input
          type="checkbox"
          checked={filters.in_stock}
          onChange={(e) => setFilters({ ...filters, in_stock: e.target.checked })}
        />
      </label>
    </div>
  );
            }
            
