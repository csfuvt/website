import { IconProp } from "@fortawesome/fontawesome-svg-core";
import MobileMenuItems from "./MobileMenuItems";

type MenuItem = {
  title: string;
  url?: string;
  submenu?: MenuItem[];
  icon?: IconProp;
};

interface MobileDropdownProps {
  submenus: MenuItem[];
  dropdown: boolean;
  depthLevel: number;
}

const MobileDropdown: React.FC<MobileDropdownProps> = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";

  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => (
        <MobileMenuItems items={submenu} key={index} depthLevel={depthLevel} showMenu={false} setShowMenu={function (show: boolean): void {
          throw new Error("Function not implemented.");
        } } />
      ))}
    </ul>
  );
};

export default MobileDropdown;

