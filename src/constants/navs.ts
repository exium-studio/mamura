import {
  IconBuildings,
  IconDatabaseCog,
  IconDeviceDesktop,
  IconExclamationCircle,
  IconGavel,
  IconHome,
  IconLanguage,
  IconMapPin,
  IconReceipt,
  IconSettings,
  IconShieldHalf,
  IconShieldLock,
} from "@tabler/icons-react";

export const LP_NAVS_1 = [
  {
    label: "Promo",
    path: "#promo",
  },
  {
    label: "Paket",
    path: "#paket",
  },
  {
    label: "Tentang",
    path: "#tentang",
  },
];
export const LP_NAVS_2 = [
  {
    label: "Blog",
    path: "/blog",
  },
  {
    label: "Karir",
    path: "/karir",
  },
  {
    label: "Kontak",
    path: "/kontak",
  },
];

export const NAVS = [
  {
    labelKey: "navs.dashboard",
    path: "/dashboard",
    icon: IconHome,
  },
  {
    labelKey: "navs.transaction",
    path: "/transaction",
    icon: IconReceipt,
  },
  {
    labelKey: "navs.master_data",
    path: "/master-data",
    icon: IconDatabaseCog,
  },
];
export const NAVS2 = [
  {
    labelKey: "navs.settings",
    path: "/settings",
    icon: IconSettings,
  },
  {
    labelKey: "navs.profile",
    path: "/profile",
    icon: IconHome,
  },
];

export const MASTER_DATA_NAVS = [
  {
    groupLabelKey: "master_data_navs_group.coverage_area",
    list: [
      {
        icon: IconBuildings,
        labelKey: "master_data_navs.city",
        path: "/master-data/city",
      },
      {
        icon: IconMapPin,
        labelKey: "master_data_navs.province",
        path: "/master-data/province",
      },
    ],
  },
];

export const SETTINGS_NAVS = [
  {
    groupLabelKey: "settings_navs_group.main",
    list: [
      {
        icon: IconDeviceDesktop,
        labelKey: "settings_navs.display",
        path: "/settings/display",
      },
      {
        icon: IconLanguage,
        labelKey: "settings_navs.regional",
        path: "/settings/regional",
      },
      {
        icon: IconShieldHalf,
        labelKey: "settings_navs.permissions",
        path: "/settings/permissions",
      },
    ],
  },
  {
    groupLabelKey: "settings_navs_group.others",
    list: [
      {
        icon: IconExclamationCircle,
        labelKey: "settings_navs.report_problem",
        path: "/settings/report-problem",
      },
      {
        icon: IconGavel,
        labelKey: "settings_navs.terms_of_service",
        path: "/settings/terms-of-service",
      },
      {
        icon: IconShieldLock,
        labelKey: "settings_navs.privacy_policy",
        path: "/settings/privacy-policy",
      },
    ],
  },
];
