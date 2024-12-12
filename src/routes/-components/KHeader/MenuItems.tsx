import { useState, useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Dropdown from './Dropdown';

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
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  let showTimeout: ReturnType<typeof setTimeout>;
  let hideTimeout: ReturnType<typeof setTimeout>;

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (
        dropdown &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setDropdown(false);
        setVisibleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    clearTimeout(hideTimeout);
    showTimeout = setTimeout(() => {
      setDropdown(true);
      setVisibleDropdown(true);
    }, 300); // Delay before showing dropdown
  };

  const onMouseLeave = () => {
    clearTimeout(showTimeout);
    hideTimeout = setTimeout(() => {
      setDropdown(false);
      setVisibleDropdown(false);
    }, 500); // Delay before hiding dropdown
  };

  const toggleDropdown = () => {
    setDropdown(prev => !prev);
    setVisibleDropdown(prev => !prev);
  };

  const closeDropdown = () => {
    if (dropdown) {
      setDropdown(false);
      setVisibleDropdown(false);
    }
  };

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
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={toggleDropdown}>
            <Link to={items.url}>
              {items.icon && (
                <FontAwesomeIcon icon={items.icon} className="menu-icon" />
              )}
              {items.title}
            </Link>
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={visibleDropdown}
          />
        </>
      ) : !items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}>
            {items.icon && (
              <FontAwesomeIcon icon={items.icon} className="menu-icon" />
            )}
            {items.title}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={visibleDropdown}
          />
        </>
      ) : (
        <Link to={items.url || '#'}>
          {items.icon && (
            <FontAwesomeIcon icon={items.icon} className="menu-icon" />
          )}
          {items.title}
        </Link>
      )}
    </li>
  );
};

export default MenuItems;
