import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>E-Shop</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/tasks">Tasks</Link>
      </div>
    </nav>
  );
}

export default Navbar;
    
