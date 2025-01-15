import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
  if (confirmLogout) {
    localStorage.removeItem("userToken"); // Hapus token dari localStorage
    window.alert("You have successfully logged out."); // Pesan setelah logout berhasil
    window.location.href = "/"; // Kembali ke halaman login
  }
  };

  return (
    <nav className="w-screen fixed top-0 z-10 bg-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center lg:ml-36">
          <h1 className="ml-2 font-bold text-neutral-100">Adz Store</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 lg:mr-44">
          <ul className="flex items-center space-x-6 text-neutral-100">
            <li>
              <Link
                to="home"
                smooth={true}
                duration={500}
                className="hover:text-gray-500 cursor-pointer"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="about"
                smooth={true}
                duration={500}
                className="hover:text-gray-500 cursor-pointer"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="product"
                smooth={true}
                duration={500}
                className="hover:text-gray-500 cursor-pointer"
              >
                Product
              </Link>
            </li>
            <li>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                className="hover:text-gray-500 cursor-pointer"
              >
                Contact
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="rounded-lg bg-red-500 hover:bg-red-700 hover:text-gray-200 px-2 py-[4px]">Log Out</button>
            </li>
          </ul>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button
            className="focus:outline-none text-neutral-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-4 to-blue-950 shadow-md">
          <ul className="flex flex-col items-center space-y-4 py-6">
            <li>
              <Link
                to="home"
                smooth={true}
                duration={500}
                className="hover:text-gray-500 cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="about"
                smooth={true}
                duration={500}
                className="hover:text-gray-500 cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="product"
                smooth={true}
                duration={500}
                className="hover:text-gray-500 cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Product
              </Link>
            </li>
            <li>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                className="hover:text-gray-500 cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="rounded-lg bg-red-500 hover:bg-red-700 hover:text-gray-200 px-2 py-[4px]">Log Out</button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
