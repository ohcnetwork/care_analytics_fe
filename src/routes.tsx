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
      facilityId={facilityId as string}
      analyticsConfigId={analyticsConfigId as string}
    />
  ),
  "/facility/:facilityId/analytics": ({
    facilityId,
  }: {
    facilityId: string;
  }) => <AnalyticsList facilityId={facilityId} />,

  "/admin/analytics_config": () => <AnalyticsConfigList />,
  "/admin/analytics_config/create": () => <AnalyticsConfigForm />,
  "/admin/analytics_config/:id/edit": ({ id }: { id: string }) => (
    <AnalyticsConfigForm id={id} />
  ),
};

export default routes;
