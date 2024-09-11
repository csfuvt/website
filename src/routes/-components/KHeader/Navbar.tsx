import { menuItemsData } from "./menuItemsData.tsx";
import MenuItems from "./MenuItems";


type MenuItem = {
  title: string;
  url?: string;
  submenu?: MenuItem[];
};

const Navbar: React.FC = () => {
  const depthLevel: number = 0;

  return (
    <nav className="desktop-nav">
      <ul className="menus">
        {menuItemsData.map((menu: MenuItem, index: number) => (
          <MenuItems items={menu} key={index} depthLevel={depthLevel} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
