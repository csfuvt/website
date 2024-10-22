import { useState, useEffect, useRef } from "react";
import { Link } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"; 
import Dropdown from "./Dropdown";

type MenuItem = {
  title: string;
  url?: string;
  submenu?: MenuItem[];
  icon?: IconDefinition;
};

interface MenuItemsProps {
  items: MenuItem;
  depthLevel: number;
}

const MenuItems: React.FC<MenuItemsProps> = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (dropdown && ref.current && !ref.current.contains(event.target as Node)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => setDropdown(true);
  const onMouseLeave = () => setDropdown(false);
  const toggleDropdown = () => setDropdown((prev) => !prev);
  const closeDropdown = () => dropdown && setDropdown(false);

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}>
      {items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={toggleDropdown}>
            <Link to={items.url}>
              {items.icon && <FontAwesomeIcon icon={items.icon} className="menu-icon" />}
              {items.title}
            </Link>
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
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
            aria-expanded={dropdown ? "true" : "false"}>
            {items.title}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
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

export default MenuItems;
