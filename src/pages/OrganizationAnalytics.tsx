import CareIcon from "@/CAREUI/icons/CareIcon";
import EntityBadge from "@/components/common/EntityBadge";
import { CardGridSkeleton } from "@/components/common/SkeletonLoading";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useFilters from "@/hooks/useFilters";
import { useAnalyticsConfigList } from "@/lib/utils";
import {
  AnalyticsConfigRead,
  AnalyticsContextType,
} from "@/types/analyticsConfig";
import { navigate } from "raviger";
import { useTranslation } from "@/hooks/useTranslation";

export const OrganizationAnalytics = ({
  contextId,
  navOrganizationId,
}: {
  contextId: string;
  navOrganizationId?: string;
}) => {
  const { t } = useTranslation();
  const { qParams, updateQuery, Pagination, resultsPerPage } = useFilters({
    limit: 15,
    disableCache: true,
  });

  const { data: response, isLoading } = useAnalyticsConfigList({
    contextType: AnalyticsContextType.organization,
    contextId: contextId,
    qParams,
    resultsPerPage,
  });

  const configs = response?.results || [];
  const handleView = (itemId: string) => {
    const baseUrl = navOrganizationId
      ? `/organization/${navOrganizationId}/children/${contextId}`
      : `/organization/${contextId}`;
    navigate(`${baseUrl}/analytics/${itemId}`);
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap">
        <div className="mt-1 flex flex-col justify-start space-y-2 md:flex-row md:justify-between md:space-y-0">
          <EntityBadge
            title={t("analytics")}
            count={configs.length}
            isFetching={isLoading}
            customTranslation={t("analytics_count", { count: configs.length })}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          type="text"
          placeholder={t("search_analytics")}
          value={qParams.name || ""}
          onChange={(e) => updateQuery({ name: e.target.value })}
          className="w-full max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <CardGridSkeleton count={6} />
        ) : configs.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="p-6 text-center text-gray-500">
              {t("no_analytics_found")}
            </CardContent>
          </Card>
        ) : (
          configs.map((config: AnalyticsConfigRead) => (
            <Card
              key={config.id as string}
              className="overflow-hidden bg-white rounded-lg transition-all hover:shadow-lg cursor-pointer hover:scale-[1.02]"
              onClick={() => handleView(config.id as string)}
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {(config.name as string) || "Untitled"}
                </h3>

                {config.description ? (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {config.description as string}
                  </p>
                ) : null}

                <div className="mt-2 flex items-center text-sm text-primary">
                  <span>{t("view_dashboard")}</span>
                  <CareIcon icon="l-arrow-right" className="size-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <Pagination totalCount={configs.length} />
    </div>
  );
};
