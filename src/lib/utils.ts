import { query } from "@/lib/requests";
import { AnalyticsContextType } from "@/types/analyticsConfig";
import analyticsConfigApi from "@/types/analyticsConfigApi";
import { useQuery } from "@tanstack/react-query";
import { type ClassValue, clsx } from "clsx";
import { QueryParam } from "raviger";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const useAnalyticsConfigList = ({
  contextType,
  contextId,
  qParams,
  resultsPerPage,
}: {
  contextType: AnalyticsContextType;
  contextId: string;
  qParams: QueryParam;
  resultsPerPage: number;
}) =>
  useQuery({
    queryKey: ["analyticsConfig", contextType, contextId, qParams],
    queryFn: query.debounced(analyticsConfigApi.listAnalytics, {
      queryParams: {
        limit: resultsPerPage,
        offset: ((qParams.page ?? 1) - 1) * resultsPerPage,
        name: qParams.name,
        context_type: contextType,
      },
    }),
  });
