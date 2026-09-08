export type IdpRole = "staff" | "mentor" | "student";

export interface AuthSession {
  username: string;
  role: IdpRole;
  groups: string[];
  auth: string;
}

export function roleOf(groups: string[] | undefined | null): IdpRole | null {
  const list = groups || [];

  if (list.includes("/staff")) {
    return "staff";
  }

  if (list.includes("/mentors")) {
    return "mentor";
  }

  if (list.includes("/students") || list.includes("/contour")) {
    return "student";
  }

  return null;
}
