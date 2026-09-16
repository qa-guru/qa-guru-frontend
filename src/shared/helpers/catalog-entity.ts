import { isGraphqlNotFound, GraphqlLikeError } from "./graphql-error";

export type CatalogEntityKind = "training" | "lecture";

export function catalogEntityMissingLabel(kind: CatalogEntityKind): string {
  if (kind === "training") {
    return "Курс не найден";
  }

  return "Урок не найден";
}

export function isTrainingEntityMissing(
  training: unknown,
  error?: GraphqlLikeError | null
): boolean {
  return training == null && isGraphqlNotFound(error);
}

export function isLectureEntityMissing(
  lecture: unknown,
  slot?: unknown
): boolean {
  return lecture == null && slot == null;
}
