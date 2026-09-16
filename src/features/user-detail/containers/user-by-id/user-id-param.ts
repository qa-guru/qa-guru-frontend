export function isOwnProfileAlias(userId: string | undefined): boolean {
  return userId === "profile";
}

export function isNumericUserId(userId: string | undefined): boolean {
  return Boolean(userId && /^\d+$/.test(userId));
}
