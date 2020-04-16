/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import UserSystem from "views/UserSystem.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
//import Units from "./views/Units";
import UnitsTable from "./views/UnitsTable";
import Facilities from "./views/Facilities";
import SecurityProfile from "./views/SecurityProfile";
import Rooms from "./views/Rooms";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/Facilities",
    name: "Main Configuration",
    //icon: "pe-7s-bell",
    component: Facilities,
    layout: "/admin"
  },
  {
    path: "/Facilities",
    name: "Facilities",
    icon: "pe-7s-home",
    component: Facilities,
    layout: "/admin"
  },
  {
    path: "/Rooms",
    name: "Rooms",
    icon: "pe-7s-note",
    component: Rooms,
    layout: "/admin"
  },
  {
    path: "/Units",
    name: "Units",
    icon: "pe-7s-photo-gallery",
    component: UnitsTable,
    layout: "/admin"
  },
  {
    path: "/Beds",
    name: "Beds Dashboard",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Security Configuration",
    //icon: "pe-7s-bell",
    component: UserSystem,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "New User",
    icon: "pe-7s-add-user",
    component: UserSystem,
    layout: "/admin"
  },
  {
    path: "/securityprofile",
    name: "Users Profiles",
    icon: "pe-7s-lock",
    component: SecurityProfile,
    layout: "/admin"
  },  
  {
    path: "/VisionDot",
    name: "Other Applications",
    //icon: "pe-7s-bell",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/VisionDot",
    name: "VisionDot",
    icon: "pe-7s-news-paper",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Extras",
    //icon: "pe-7s-bell",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin"
  }
  
  
];

export default dashboardRoutes;
