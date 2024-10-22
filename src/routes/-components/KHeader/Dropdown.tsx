import MenuItems from "./MenuItems";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"; 


type MenuItem = {
  title: string;
  url?: string;
  submenu?: MenuItem[];
  icon?: IconDefinition;
};


interface DropdownProps {
  submenus: MenuItem[];
  dropdown: boolean;
  depthLevel: number;
}

const Dropdown: React.FC<DropdownProps> = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";

  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  );
};

export default Dropdown;
