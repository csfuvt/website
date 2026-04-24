import MobileNav from './MobileNav.tsx';
import Navbar from './Navbar.tsx';
import { Link } from '@tanstack/react-router';
import './Header.css';
import logo from '../../../assets/logo.png';
import { LanguageSwitcher } from './LanguageSwitcher.tsx';

const Header = () => {
  return (
    <header>
      <div className="nav-area">
        <Link to="/" className="logo">
          <img src={logo} className="logo" alt="Logo" />
        </Link>

        <Navbar />

        <LanguageSwitcher />

        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
