import { AxiosError, create, isAxiosError } from "axios";
import { PROVISIONING_API } from "config";

import { getProvisioningAccessToken } from "api/rest/provisioning-token";

import {
  httpErrorText,
  staffIssueBody,
  StaffIssueInput,
  STAFF_CONTOURS_PATH,
} from "./staff-issue";
import { OwnerView, VisibilityUpdate, ContourStatus } from "./types";

export class ProvisioningHttpError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, body?: unknown, message?: string) {
    super(message ?? `provisioning ${status}`);
    this.status = status;
    this.body = body;
  }
}

function authHeaders(): Record<string, string> {
  const token = getProvisioningAccessToken();

  if (!token) {
    return {};
  }

  return { Authorization: `Bearer ${token}` };
}

const JSON_HEADERS = {
  "content-type": "application/json",
} as const;

const http = create();

http.interceptors.response.use(undefined, async (error: AxiosError) => {
  const config = error.config as
    | (typeof error.config & { __retried?: boolean })
    | undefined;
  const status = error.response?.status ?? 0;
  const transient = !error.response || status >= 500;

  if (config?.method === "get" && transient && !config.__retried) {
    config.__retried = true;
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    return http.request(config);
  }

  return Promise.reject(error);
});

function rethrow(error: unknown): never {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status ?? 0;
    const data = axiosError.response?.data;

    throw new ProvisioningHttpError(
      status || 0,
      data,
      httpErrorText(status || 0, data)
    );
  }

  throw new ProvisioningHttpError(0);
}

function apiUrl(path: string): string {
  return `${PROVISIONING_API.replace(/\/$/, "")}${path}`;
}

function meUrl(): string {
  return apiUrl("/api/me");
}

export default class ProvisioningService {
  static async getMe(): Promise<OwnerView> {
    try {
      const response = await http.get<OwnerView>(meUrl(), {
        headers: authHeaders(),
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rethrow(error);
    }
  }

  static async issueContour(courseId?: string): Promise<ContourStatus> {
    const label = courseId?.trim();

    try {
      const response = await http.post<ContourStatus>(
        `${meUrl()}/contours`,
        label ? { courseId: label } : {},
        {
          headers: {
            ...authHeaders(),
            ...JSON_HEADERS,
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rethrow(error);
    }
  }

  static async issueStaffContour(
    input: StaffIssueInput
  ): Promise<ContourStatus> {
    try {
      const response = await http.post<ContourStatus>(
        apiUrl(STAFF_CONTOURS_PATH),
        staffIssueBody(input),
        {
          headers: {
            ...authHeaders(),
            ...JSON_HEADERS,
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rethrow(error);
    }
  }

  static async updateVisibility(body: VisibilityUpdate): Promise<OwnerView> {
    try {
      const response = await http.put<OwnerView>(
        `${meUrl()}/visibility`,
        body,
        {
          headers: {
            ...authHeaders(),
            ...JSON_HEADERS,
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rethrow(error);
    }
  }
}
