import config from "~/config";
import Home from "~/pages/Home/Home";
import Login from "~/pages/Login/Login";
import Reports from "~/pages/Reports/Reports";
import ShopProfile from "~/pages/ShopProfile/ShopProfile";
import ViewOrders from "~/pages/ViewOrders/ViewOrders";
import ViewItems from "~/pages/ViewItems/ViewItems";
import ViewStores from "~/pages/ViewStore/ViewStores";
import ViewUsers from "~/pages/ViewUser/ViewUsers";
import DetailItem from "~/pages/ViewItems/DetailItem";
import DetailStore from "~/pages/ViewStore/DetailStore";
import DetailUser from "~/pages/ViewUser/DetailUser";
const supplierRoutes = [];

const adminRoutes = [
  {
    path: config.routes.login,
    component: Login,
    layout: null,
  },
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.viewItems,
    component: ViewItems,
  },
  {
    path: config.routes.viewOrders,
    component: ViewOrders,
  },
  {
    path: config.routes.viewStores,
    component: ViewStores,
  },
  {
    path: config.routes.viewUsers,
    component: ViewUsers,
  },
  {
    path: config.routes.detailItem,
    component: DetailItem,
  },
  {
    path: config.routes.detailStore,
    component: DetailStore,
  },
  {
    path: config.routes.detailUser,
    component: DetailUser,
  },
  {
    path: config.routes.reports,
    component: Reports,
  },
];

export { supplierRoutes, adminRoutes };
