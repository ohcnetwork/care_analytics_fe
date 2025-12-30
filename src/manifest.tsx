import routes from "./routes";
import AnalyticsIcon from "./CAREUI/icons/AnalyticsIcon";
import { OrganizationAnalytics } from "@/pages/OrganizationAnalytics";

const manifest = {
  plugin: "care_analytics_fe",
  routes,
  extends: [],
  components: {},
  navItems: [
    {
      name: "Analytics",
      url: "analytics",
      icon: <AnalyticsIcon />,
    },
  ],
  adminNavItems: [
    {
      name: "Analytics Config",
      url: "/admin/analytics_config",
      icon: <AnalyticsIcon />,
    },
  ],
  organizationTabs: [
    {
      name: "Analytics",
      slug: "analytics",
      icon: <AnalyticsIcon />,
      component: OrganizationAnalytics,
    },
  ],
};

export default manifest;
