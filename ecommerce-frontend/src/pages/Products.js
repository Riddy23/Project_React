import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Products() {
  return (
    <div className="product-page">
      <h2>Products</h2>
      <div className="product-grid">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default Products;
