import { ContourJobStatus } from "./types";

export const STAFF_CONTOURS_PATH = "/api/staff/contours";

export type StaffIssueInput = {
  email: string;
  handle: string;
};

export type StaffIssueBody = {
  handle: string;
  email: string;
  courseId: "etalon";
};

export function staffIssueBody(input: StaffIssueInput): StaffIssueBody {
  return {
    handle: input.handle.trim(),
    email: input.email.trim(),
    courseId: "etalon",
  };
}

function messageFromBody(data: unknown): string {
  if (typeof data === "string" && data.trim()) {
    return data.trim();
  }

  if (!data || typeof data !== "object") {
    return "";
  }

  const rec = data as Record<string, unknown>;

  for (const key of ["message", "detail", "title"]) {
    const value = rec[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

export function httpErrorText(status: number, data: unknown): string {
  const fromBody = messageFromBody(data);

  if (fromBody) {
    return fromBody;
  }

  if (status === 409) {
    return "Квота: один активный контур на курс";
  }

  if (status === 403) {
    return "Нет права выдавать контур";
  }

  if (status === 400) {
    return "Запрос отклонён (400)";
  }

  if (!status) {
    return "Не удалось связаться с provisioning";
  }

  return `provisioning ${status}`;
}

export function staffIssueStatusLine(
  status: ContourJobStatus,
  error?: string
): string {
  if (error) {
    return `Статус: ${status} — ${error}`;
  }

  return `Статус: ${status}`;
}
