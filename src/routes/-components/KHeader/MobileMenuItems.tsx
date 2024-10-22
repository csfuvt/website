import { useState } from "react";
import { Link } from '@tanstack/react-router';
import MobileDropdown from "./MobileDropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core"; 


type MenuItem = {
  title: string;
  url?: string;
  submenu?: MenuItem[];
  icon?: IconProp; 
};


interface MobileMenuItemsProps {
  items: MenuItem;
  depthLevel: number;
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
}

const MobileMenuItems: React.FC<MobileMenuItemsProps> = ({ items, depthLevel, showMenu, setShowMenu }) => {
  const [dropdown, setDropdown] = useState<boolean>(false);

  const closeDropdown = () => {
    if (dropdown) setDropdown(false);
    if (showMenu) setShowMenu(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdown((prev) => !prev);
  };

  return (
    <li className="menu-items" onClick={closeDropdown}>
      {items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
          >
            <Link to={items.url} onClick={closeDropdown}>
              {items.icon && <FontAwesomeIcon icon={items.icon} className="menu-icon" />}
              {items.title}
            </Link>
            <div onClick={(e) => toggleDropdown(e)}>
              {dropdown ? <span className="arrow-close" /> : <span className="arrow" />}
            </div>
          </button>
          <MobileDropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : !items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
          >
            {items.title}
            <div onClick={(e) => toggleDropdown(e)}>
              {dropdown ? <span className="arrow-close" /> : <span className="arrow" />}
            </div>
          </button>
          <MobileDropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Link to={items.url || "#"}>
          {items.icon && <FontAwesomeIcon icon={items.icon} className="menu-icon" />}
          {items.title}
        </Link>
      )}
    </li>
  );
};

export default MobileMenuItems;
