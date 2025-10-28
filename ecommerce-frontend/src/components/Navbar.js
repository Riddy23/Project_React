import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Install lucide-react for icons

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <h2 className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition-colors duration-200">
          E-Shop
        </h2>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="hover:text-yellow-300 font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-yellow-300 font-medium transition-colors duration-200"
          >
            Products
          </Link>
          <Link
            to="/tasks"
            className="hover:text-yellow-300 font-medium transition-colors duration-200"
          >
            Tasks
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-6 pb-4 flex flex-col space-y-3">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-yellow-300 font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setIsOpen(false)}
            className="hover:text-yellow-300 font-medium transition-colors duration-200"
          >
            Products
          </Link>
          <Link
            to="/tasks"
            onClick={() => setIsOpen(false)}
            className="hover:text-yellow-300 font-medium transition-colors duration-200"
          >
            Tasks
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
              
