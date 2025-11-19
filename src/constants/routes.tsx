import BlogDetailPage from "@/pages/BlogDetailPage";
import BlogPage from "@/pages/BlogPage";
import CareerPage from "@/pages/CareerPage";
import ContactPage from "@/pages/ContactPage";
import HomePage from "@/pages/HomePage";
import JobApplicationPage from "@/pages/JobApplicationPage";
import { Interface__PrivateRoute, Interface__Route } from "./interfaces";
import InternetSuspendPage from "@/pages/InternetSuspendPage";

export const LP_ROUTES: Interface__Route[] = [
  {
    path: "/",
    activePath: "/",
    element: <HomePage />,
  },
  {
    path: "/blog",
    activePath: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/blog/:slug",
    activePath: "/blog",
    element: <BlogDetailPage />,
  },
  {
    path: "/karir",
    activePath: "/karir",
    element: <CareerPage />,
  },
  {
    path: "/karir/submit",
    activePath: "/karir",
    element: <JobApplicationPage />,
  },
  {
    path: "/kontak",
    activePath: "/kontak",
    element: <ContactPage />,
  },
  {
    path: "/internet-suspend",
    activePath: "/internet-suspend",
    element: <InternetSuspendPage />,
  },
];

export const MASTER_DATA_ROUTES: Interface__PrivateRoute[] = [];

export const CLEAN_LAYOUT_ROUTES = ["/internet-suspend"];
