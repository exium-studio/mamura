import AdminRootPage from "@/pages/_admin/AdminRootPage";
import DashboardPage from "@/pages/_admin/DashboardPage";
import MasterDataPage from "@/pages/_admin/MasterDataPage";
import TransactionPage from "@/pages/_admin/TransactionPage";
import { Interface__PrivateRoute, Interface__Route } from "./interfaces";
import HomePage from "@/pages/HomePage";

export const LP_ROUTES: Interface__Route[] = [
  {
    path: "/",
    activePath: "/",
    element: <HomePage />,
  },
];

export const ADMIN_ROUTES: Interface__Route[] = [
  {
    path: "/admin",
    activePath: "/admin",
    element: <AdminRootPage />,
  },
];

export const ADMIN_PRIVATE_ROUTES: Interface__PrivateRoute[] = [
  {
    path: "/admin/dashboard",
    activePath: "/dashboard",
    titleKey: "navs.dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/admin/transaction",
    activePath: "/transaction",
    titleKey: "navs.transaction",
    element: <TransactionPage />,
  },

  // Master Data
  {
    path: "/admin/master-data",
    activePath: "/master-data",
    titleKey: "navs.master_data",
    element: <MasterDataPage />,
  },
];

export const MASTER_DATA_ROUTES: Interface__PrivateRoute[] = [];
