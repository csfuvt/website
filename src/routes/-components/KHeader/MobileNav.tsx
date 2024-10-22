import React, { useEffect, useRef, useState } from "react";
import { menuItemsData } from "./menuItemsData.tsx";
import MobileMenuItems from "./MobileMenuItems";
import Hamburger  from "../../../../public/hamburger.png";


type MenuItem = {
  title: string;
  url?: string;
  submenu?: MenuItem[];
};

const MobileNav: React.FC = () => {
  const depthLevel: number = 0;
  const [showMenu, setShowMenu] = useState<boolean>(false);
  
  
  let ref = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (showMenu && ref.current && !ref.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [showMenu]);

  return (
    <nav className="mobile-nav">
      <button
        className="mobile-nav__menu-button"
        type="button"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <img src={Hamburger} className="mobile-nav__menu-button " alt="Meniu" />
      </button>

      {showMenu && (
        <ul className="menus" ref={ref}>
          {menuItemsData.map((menu: MenuItem, index: number) => {
            return (
              <MobileMenuItems
                items={menu}
                key={index}
                depthLevel={depthLevel}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
              />
            );
          })}
        </ul>
      )}
    </nav>
  );
};

export default MobileNav;
