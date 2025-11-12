import { HttpMethod, PaginatedResponse, Type } from "@/lib/requests";

import {
  AnalyticsConfigCreate,
  AnalyticsConfigRead,
  AnalyticsUrlResponse,
} from "./analyticsConfig";

export default {
  listAnalytics: {
    path: "/api/analytics/config/",
    method: HttpMethod.GET,
    TRes: Type<PaginatedResponse<AnalyticsConfigRead>>(),
  },
  retrieveAnalyticsConfig: {
    path: "/api/analytics/config/{analyticsConfigId}/",
    method: HttpMethod.GET,
    TRes: Type<AnalyticsConfigRead>(),
  },
  createAnalyticsConfig: {
    path: "/api/analytics/config/",
    method: HttpMethod.POST,
    TRes: Type<AnalyticsConfigRead>(),
    TBody: Type<AnalyticsConfigCreate>(),
  },
  updateAnalyticsConfig: {
    path: "/api/analytics/config/{analyticsConfigId}/",
    method: HttpMethod.PUT,
    TRes: Type<AnalyticsConfigRead>(),
    TBody: Type<AnalyticsConfigCreate>(),
  },
  generateAnalyticsUrl: {
    path: "/api/analytics/config/{analyticsConfigId}/generate_analytics_url/",
    method: HttpMethod.POST,
    TRes: Type<AnalyticsUrlResponse>(),
  },
  archiveAnalyticsConfig: {
    path: "/api/analytics/config/{analyticsConfigId}/",
    method: HttpMethod.DELETE,
    TRes: Type<void>(),
  },
} as const;
