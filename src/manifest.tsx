import routes from "./routes";
import AnalyticsIcon from "./CAREUI/icons/AnalyticsIcon";
import {
  AnalyticsContextType,
  AnalyticsConfigRead,
} from "@/types/analyticsConfig";
import { useAnalyticsConfigList } from "@/lib/utils";
import { QueryParam } from "raviger";

export const useOrganizationNavItems = (
  contextId: string,
  qParams: QueryParam,
  resultsPerPage: number
) => {
  const { data: response } = useAnalyticsConfigList({
    contextType: AnalyticsContextType.organization,
    contextId,
    qParams,
    resultsPerPage,
  });

  const configs: AnalyticsConfigRead[] = response?.results || [];

  return configs;
};

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
  organizationNavItems: useOrganizationNavItems,
};

export default manifest;
