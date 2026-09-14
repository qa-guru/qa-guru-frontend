import axios, { AxiosError, isAxiosError } from "axios";
import { PROVISIONING_API } from "config";

import { getProvisioningAccessToken } from "api/rest/provisioning-token";

import { httpErrorText, staffIssueBody, StaffIssueInput, STAFF_CONTOURS_PATH } from "./staff-issue";
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
      const response = await axios.get<OwnerView>(meUrl(), {
        headers: authHeaders(),
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rethrow(error);
    }
  }

  static async issueContour(): Promise<ContourStatus> {
    try {
      const response = await axios.post<ContourStatus>(
        `${meUrl()}/contours`,
        { courseId: "etalon" },
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
      const response = await axios.post<ContourStatus>(
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
      const response = await axios.put<OwnerView>(`${meUrl()}/visibility`, body, {
        headers: {
          ...authHeaders(),
          ...JSON_HEADERS,
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rethrow(error);
    }
  }
}
