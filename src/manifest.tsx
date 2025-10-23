import routes from "./routes";
import AnalyticsIcon from "./components/icon";

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
};

export default manifest;
