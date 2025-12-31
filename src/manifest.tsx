import routes from "./routes";
import { OrganizationAnalytics } from "@/pages/OrganizationAnalytics";
import { ChartLine } from "lucide-react";

const manifest = {
  plugin: "care_analytics_fe",
  routes,
  extends: [],
  components: {},
  navItems: [
    {
      name: "Analytics",
      url: "analytics",
      icon: <ChartLine />,
    },
  ],
  adminNavItems: [
    {
      name: "Analytics Config",
      url: "/admin/analytics_config",
      icon: <ChartLine />,
    },
  ],
  organizationTabs: [
    {
      name: "Analytics",
      slug: "analytics",
      icon: <ChartLine size={14} />,
      component: OrganizationAnalytics,
    },
  ],
};

export default manifest;
