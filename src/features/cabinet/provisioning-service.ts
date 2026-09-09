import axios, { AxiosError, isAxiosError } from "axios";
import { PROVISIONING_API } from "config";

import { getProvisioningAccessToken } from "api/rest/provisioning-token";

import { OwnerView, VisibilityUpdate, ContourStatus } from "./types";

export class ProvisioningHttpError extends Error {
  status: number;

  constructor(status: number) {
    super(`provisioning ${status}`);
    this.status = status;
  }
}

function authHeaders(): Record<string, string> {
  const token = getProvisioningAccessToken();

  if (!token) {
    return {};
  }

  return { Authorization: `Bearer ${token}` };
}

function rethrow(error: unknown): never {
  if (isAxiosError(error)) {
    const status = (error as AxiosError).response?.status ?? 0;

    throw new ProvisioningHttpError(status || 0);
  }

  throw new ProvisioningHttpError(0);
}

function meUrl(): string {
  return `${PROVISIONING_API.replace(/\/$/, "")}/api/me`;
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
            "content-type": "application/json",
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
          "content-type": "application/json",
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rethrow(error);
    }
  }
}
