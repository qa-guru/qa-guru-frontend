type NameParts = {
  firstName?: string | null;
  lastName?: string | null;
};

export type FormatUserFullNameInput = {
  user?: NameParts | null;
  firstName?: string | null;
  lastName?: string | null;
};

function usableNamePart(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed || trimmed === "undefined" || trimmed === "null") {
    return undefined;
  }

  return trimmed;
}

export function formatUserFullName(
  input?: FormatUserFullNameInput
): string {
  const source =
    input?.user != null
      ? input.user
      : { firstName: input?.firstName, lastName: input?.lastName };

  return [usableNamePart(source?.firstName), usableNamePart(source?.lastName)]
    .filter((part): part is string => Boolean(part))
    .join(" ");
}

export function formatUserInitials(fullName?: string | null): string {
  const parts = (fullName ?? "")
    .split(/\s+/)
    .map(usableNamePart)
    .filter((part): part is string => Boolean(part));

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`;
  }

  if (parts.length === 1) {
    return parts[0][0] ?? "";
  }

  return "";
}
