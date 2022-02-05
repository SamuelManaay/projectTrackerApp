import React, { useState } from "react";
import { elastic as Menu } from 'react-burger-menu';
import { Link } from "react-router-dom";
import './Sidebar.css';
import Competencies from "./Competencies";
import GeneralSettings from "./GeneralSettings";
import EmployeeList from "./EmployeeList";
// export default props => {
//   return (

//     // <Menu>
//     //   <a className="menu-item" href="/employees">
//     //     Employee List
//     //   </a>
//     //   <a className="menu-item" href="/generalsettings">
//     //     General Settings
//     //   </a>
//     //   <a className="menu-item" href="/competencies">
//     //     Competencies
//     //   </a>
//     // </Menu>
//   );
// };
function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (
      <nav className={sidebar ? "sidebar active" : "sidebar"}>
        <button className="hamburger" type="button" onClick={showSidebar}>
          <div></div>
        </button>
        <ul onClick={showSidebar}>
          <li><Link to="/competencies">Competencies</Link></li>
          <li><Link to="/generalsettings">GeneralSettings</Link></li>
          <li><Link to="/employees">EmployeeList</Link></li>
        </ul>
      </nav>
    );
  }
  
  export default Sidebar;