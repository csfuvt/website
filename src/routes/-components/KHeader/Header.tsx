import MobileNav from "./MobileNav.tsx";
import Navbar from "./Navbar.tsx";
import { Link } from '@tanstack/react-router';
import  './Header.css';
import logo from '../../../assets/logo.png';

const Header = () => {
  return (
    <header>
      <div className="nav-area">
        <Link to="/" className="logo">
        <img src={logo} className="logo" alt="Logo" />
        </Link>

        {/* ecran mare */}
        <Navbar />

        {/*ecran mic */}
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
