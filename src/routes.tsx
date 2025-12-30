import { AnalyticsContextType } from "@/types/analyticsConfig";
import AnalyticsConfigForm from "./pages/AnalyticsConfigForm";
import AnalyticsConfigList from "./pages/AnalyticsConfigList";
import AnalyticsList from "./pages/AnalyticsList";
import AnalyticsViewer from "./pages/AnalyticsViewer";

const routes = {
  "/facility/:facilityId/analytics/:analyticsConfigId": ({
    facilityId,
    analyticsConfigId,
  }: {
    facilityId: string;
    analyticsConfigId: string;
  }) => (
    <AnalyticsViewer
      contextId={facilityId as string}
      contextType={AnalyticsContextType.facility}
      analyticsConfigId={analyticsConfigId as string}
    />
  ),
  "/organization/:organizationId/children/:contextId/analytics/:analyticsConfigId":
    ({
      organizationId,
      analyticsConfigId,
    }: {
      organizationId: string;
      analyticsConfigId: string;
    }) => (
      <AnalyticsViewer
        contextId={organizationId}
        contextType={AnalyticsContextType.organization}
        analyticsConfigId={analyticsConfigId}
      />
    ),
  "/organization/:organizationId/analytics/:analyticsConfigId": ({
    organizationId,
    analyticsConfigId,
  }: {
    organizationId: string;
    analyticsConfigId: string;
  }) => (
    <AnalyticsViewer
      contextId={organizationId}
      contextType={AnalyticsContextType.organization}
      analyticsConfigId={analyticsConfigId}
    />
  ),
  "/facility/:facilityId/analytics": ({
    facilityId,
  }: {
    facilityId: string;
  }) => (
    <AnalyticsList
      contextId={facilityId}
      contextType={AnalyticsContextType.facility}
    />
  ),
  "/admin/analytics_config": () => <AnalyticsConfigList />,
  "/admin/analytics_config/create": () => <AnalyticsConfigForm />,
  "/admin/analytics_config/:id/edit": ({ id }: { id: string }) => (
    <AnalyticsConfigForm id={id} />
  ),
};

export default routes;
