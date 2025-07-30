import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import logo from '../assets/ghibli-pedia-logo.png';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeLinkStyle = {
    color: '#E0AFA0',
    textDecoration: 'underline',
  };

  const navLinks = [
    { to: "/", text: "Films" },
    { to: "/people", text: "People" },
    { to: "/locations", text: "Locations" },
    { to: "/species", text: "Species" },
    { to: "/vehicles", text: "Vehicles" },
  ];

  return (
    <>
      <header className="bg-white/80 dark:bg-ghibli-text/80 backdrop-blur-sm shadow-md p-4 sticky top-0 z-30 transition-colors duration-300">
        <div className="container mx-auto flex justify-between items-center">

          <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3">
            <img src={logo} alt="Ghibli-pedia Logo" className="h-10 w-auto" /> {/* <-- 2. Tampilkan logo */}
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-ghibli-text dark:text-ghibli-bg">
              Ghibli-pedia
            </h1>
          </Link>

          <nav className="hidden md:flex gap-6 items-center font-semibold text-gray-600 dark:text-gray-300">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-ghibli-header">{link.text}</NavLink>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="md:hidden z-40" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <div 
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-ghibli-bg dark:bg-ghibli-deep-blue z-20 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-semibold">
          {navLinks.map(link => (
            <NavLink 
              key={link.to} 
              to={link.to} 
              style={({ isActive }) => isActive ? activeLinkStyle : undefined} 
              className="hover:text-ghibli-header"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.text}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;